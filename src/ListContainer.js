// import React, { useState, useEffect } from 'react';

// const ListContainer = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [lists, setLists] = useState([]);

//   useEffect(() => {
//     fetchListCreationAPI();
//   }, []);

//   const fetchListCreationAPI = () => {
//     setLoading(true);
//     setError(false);

//     fetch('https://apis.ccbp.in/list-creation/lists')
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Failed to fetch data');
//       })
//       .then(data => {
//         setLists(data.lists);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError(true);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="ListContainer">
//     <div className="head"><h1> List creation</h1></div>
//       <button>Create a new list</button>
//       {loading && <div>Loading...</div>}
//       {error && <div>Failed to fetch data. Please try again.</div>}
//       {!loading && !error && (
//         <div className="ListContainersWrapper">
//           <div className="ListContainerBox">
//             <h3><input type='checkbox'></input>List1</h3>
//             <div className="ListItemsContainer">
//               {lists
//                 .filter(item => item.list_number === 1)
//                 .map(item => (
//                   <div key={item.id} className="ListItemBox">
//                     <span>{item.name}</span>
//                     <p>{item.description}</p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="ListContainerBox">
//             <h3><input type='checkbox'></input>List2</h3>
//             <div className="ListItemsContainer">
//               {lists
//                 .filter(item => item.list_number === 2)
//                 .map(item => (
//                   <div key={item.id} className="ListItemBox">
//                     <span>{item.name}</span>
//                     <p>{item.description}</p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListContainer;



// import React, { useState, useEffect } from 'react';

// const ListContainer = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [lists, setLists] = useState([]);
//   const [showNewList, setShowNewList] = useState(false);
//   const [newListItems, setNewListItems] = useState([]);

//   useEffect(() => {
//     fetchListCreationAPI();
//   }, []);

//   const fetchListCreationAPI = () => {
//     setLoading(true);
//     setError(false);

//     fetch('https://apis.ccbp.in/list-creation/lists')
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Failed to fetch data');
//       })
//       .then(data => {
//         setLists(data.lists);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError(true);
//         setLoading(false);
//       });
//   };

//   const handleCreateNewList = () => {
//     setShowNewList(true);
//   };

//   const handleCancel = () => {
//     setShowNewList(false);
//     setNewListItems([]); // Reset the items in the new list on cancel
//   };

//   const handleUpdate = () => {
//     setShowNewList(false);
//     // Handle update logic if needed
//   };

//   const moveToNewList = (item) => {
//     setNewListItems([...newListItems, item]);
//   };

//   const renderNewListContainer = () => {
//     if (showNewList) {
//       return (
//         <div className="ListContainerBox">
//           <h3>New List</h3>
//           <div className="ListItemsContainer">
//             {newListItems.map(item => (
//               <div key={item.id} className="ListItemBox">
//                 <span>{item.name}</span>
//                 <p>{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="ListContainer">
//       {!showNewList && (
//         <div>
//           <div className="head"><h1> List creation</h1></div>
//           <button onClick={handleCreateNewList}>Create a new list</button>
//         </div>
//       )}
//       {loading && <div>Loading...</div>}
//       {error && <div>Failed to fetch data. Please try again.</div>}
//       {!loading && !error && (
//         <div className="ListContainersWrapper">
//           <div className="ListContainerBox">
//             <h3>List1</h3>
//             <div className="ListItemsContainer">
//               {lists
//                 .filter(item => item.list_number === 1)
//                 .map(item => (
//                   <div key={item.id} className="ListItemBox">
//                     <span>{item.name}</span>
//                     <p>{item.description}</p>
//                     <button onClick={() => moveToNewList(item)}>&rarr;</button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="ListContainerBox">
//              <h3>List2</h3>
//              <div className="ListItemsContainer">
//                {lists
//                  .filter(item => item.list_number === 2)
//                  .map(item => (
//                    <div key={item.id} className="ListItemBox">
//                      <span>{item.name}</span>
//                      <p>{item.description}</p>
//                      <button onClick={() => moveToNewList(item)}>&rarr;</button>
//                    </div>
//                  ))}
//              </div>
//            </div>
//           {renderNewListContainer()}
//         </div>
//       )}
//       {showNewList && (
//         <div>
//           {/* Buttons for the new ListContainer */}
//           <button onClick={handleCancel}>Cancel</button>
//           <button onClick={handleUpdate}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListContainer;



import React, { useState, useEffect } from 'react';

const ListContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const [newListItems, setNewListItems] = useState([]);

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

  const handleCreateNewList = () => {
    setShowNewList(true);
  };

  const handleCancel = () => {
    setShowNewList(false);
    setNewListItems([]); // Reset the items in the new list on cancel
  };

  const handleUpdate = () => {
    setShowNewList(false);
    // Handle update logic if needed
  };

  const moveToNewList = item => {
    setNewListItems([...newListItems, item]);
  };

  const renderNewListContainer = () => {
    if (showNewList) {
      return (
        <div className="ListContainerBox">
          <h3>New List</h3>
          <div className="ListItemsContainer">
            {newListItems.map(item => (
              <div key={item.id} className="ListItemBox">
                <span>{item.name}</span>
                <p>{item.description}</p>
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
            <h3>List1</h3>
            <div className="ListItemsContainer">
              {lists
                .filter(item => item.list_number === 1)
                .map(item => (
                  <div key={item.id} className="ListItemBox">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                    {showNewList && (
                      <button onClick={() => moveToNewList(item)}>&rarr;</button>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="ListContainerBox">
            <h3>List2</h3>
            <div className="ListItemsContainer">
              {lists
                .filter(item => item.list_number === 2)
                .map(item => (
                  <div key={item.id} className="ListItemBox">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                    {showNewList && (
                      <button onClick={() => moveToNewList(item)}>&rarr;</button>
                    )}
                  </div>
                ))}
            </div>
          </div>
          {renderNewListContainer()}
        </div>
      )}
      {showNewList && (
        <div>
          {/* Buttons for the new ListContainer */}
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ListContainer;
