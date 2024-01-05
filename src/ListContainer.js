import React, { useState, useEffect } from 'react';

const ListContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const [newListItems, setNewListItems] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    list1: false,
    list2: false,
  });

  useEffect(() => {
    fetchListCreationAPI();
  }, []);

  const fetchListCreationAPI = () => {
    setLoading(true);
    setError(false);

    fetch('https://apis.ccbp.in/list-creation/lists')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch data');
      })
      .then(data => {
        setLists(data.lists);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const resetSelectedCheckboxes = () => {
    setSelectedCheckboxes({
      list1: false,
      list2: false,
    });
  };

  const handleCreateNewList = () => {
    const selectedCount = Object.values(selectedCheckboxes).filter(
      checkbox => checkbox
    ).length;

    if (selectedCount === 2) {
      setShowNewList(true);
      setNewListItems([]);
      resetSelectedCheckboxes();
    } else {
      alert('You should select exactly 2 lists to create a new list');
    }
  };

  const handleCancel = () => {
    setShowNewList(false);
    setNewListItems([]);
  };

  const handleUpdate = () => {
    setShowNewList(false);
    setLists([...lists, ...newListItems]);
    setNewListItems([]);
  };

  const moveToNewList = (item) => {
    // Remove the item from its current list
    const updatedLists = lists.filter(listItem => listItem.id !== item.id);
  
    // Add the item to List 3
    const newItem = { ...item, list_number: 3 };
    updatedLists.push(newItem);
  
    // Update the lists state
    setLists(updatedLists);
  };

  const handleCheckboxChange = listNumber => {
    setSelectedCheckboxes(prevState => ({
      ...prevState,
      [listNumber]: !prevState[listNumber],
    }));
  };
  
  const saveListsToLocalStorage = () => {
    const listsToSave = {
      list1: {
        items: lists.filter(item => item.list_number === 1),
        count: lists.filter(item => item.list_number === 1).length,
      },
      list2: {
        items: lists.filter(item => item.list_number === 2),
        count: lists.filter(item => item.list_number === 2).length,
      },
      list3: {
        items: lists.filter(item => item.list_number === 3),
        count: lists.filter(item => item.list_number === 3).length,
      },
    };
  
    localStorage.setItem('lists', JSON.stringify(listsToSave));
  };
  
  const moveToList1 = (item) => {
    const updatedLists = lists.map(listItem => listItem.id === item.id ? { ...listItem, list_number: 1 } : listItem);
    setLists(updatedLists);
    saveListsToLocalStorage();
  };
  
  const moveToList2 = (item) => {
    const updatedLists = lists.map(listItem => listItem.id === item.id ? { ...listItem, list_number: 2 } : listItem);
    setLists(updatedLists);
    saveListsToLocalStorage();
  };
  
  const renderNewListContainer = () => {
    if (showNewList) {
      return (
        <div className="ListContainerBox">
          <h3>List 3 ({lists.filter(item => item.list_number === 3).length})</h3>
          <div className="ListItemsContainer">
            {lists.filter(item => item.list_number === 3).map(item => (
            <div key={item.id} className="ListItemBox">
             <span>{item.name}</span>
             <p>{item.description}</p>
             <text onClick={() => moveToList1(item)} style={{cursor: 'pointer'}}>&#129120;</text>
            <text onClick={() => moveToList2(item)} style={{cursor: 'pointer', marginLeft:'80%'}}>&#129122;</text>
        </div>
        ))}
        </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="ListContainer">
      {!showNewList && (
        <div>
          <div className="head">
            <h1> List creation</h1>
          </div>
          <button onClick={handleCreateNewList}>Create a new list</button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Failed to fetch data. Please try again.</div>}
      {!loading && !error && (
        <div className="ListContainersWrapper">
          <div className="ListContainerBox">
            <h3>
            {showNewList ? `List 1 (${lists.filter(item => item.list_number === 1).length})` : (
                <>
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes.list1}
                    onChange={() => handleCheckboxChange('list1')}
                  /> List 1
                </>
              )}
            </h3>
            <div className="ListItemsContainer">
              {lists
                .filter(item => item.list_number === 1)
                .map(item => (
                  <div key={item.id} className="ListItemBox">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                    {showNewList && (
                      <text onClick={() => moveToNewList(item)} style={{cursor: 'pointer', marginLeft:'80%'}}>&#129122;</text>
                    )}
                  </div>
                ))}
            </div>
          </div>
          {renderNewListContainer()}
          <div className="ListContainerBox">
            <h3> 
            {showNewList ? `List 2 (${lists.filter(item => item.list_number === 2).length})` : (
                <>
                  <input
                    type="checkbox"
                    checked={selectedCheckboxes.list2}
                    onChange={() => handleCheckboxChange('list2')}
                  /> List 2
                </>
              )}</h3>
            <div className="ListItemsContainer">
              {lists
                .filter(item => item.list_number === 2)
                .map(item => (
                  <div key={item.id} className="ListItemBox">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                    {showNewList && (
                      <text onClick={() => moveToNewList(item)} style={{cursor: 'pointer', marginLeft:'80%'}}>&#129120;</text>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {showNewList && (
        <div>
          <button onClick={handleCancel} style={{margin: "20px"}}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ListContainer;


