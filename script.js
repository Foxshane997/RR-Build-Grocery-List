const grocerySubmit = document.getElementById("addGrocery");
const list = document.getElementById("list");
const clearBtn = document.getElementById("clear");

// Setting the initial state value
const initialState = {
  groceries: [],
};

// Declaring reducer that takes state value & gives action as argument
const groceryReducer = (state = initialState.groceries, action) => {
  switch (action.type) {
    case "grocery/add":
      return [
        ...state,
        {
          text: action.text,
        },
      ];
    case "grocery/clear":
      return [];
    default:
      return state;
  }
};

// Declaring the Store
let store = Redux.createStore(groceryReducer);

// Dispatches
const clearList = () => {
  document.getElementById("newItem").value = "";
  store.dispatch({
    type: "grocery/clear",
  });
};

const newGrocery = (e) => {
  e.preventDefault();
  let groceryText = document.getElementById("newItem").value;
  store.dispatch({
    type: "grocery/add",
    text: groceryText,
  });
  console.log(store.getState());
};

// Event Listeners
grocerySubmit.addEventListener("click", (e) => {
  newGrocery(e);
});
clearBtn.addEventListener("click", clearList);

// Building the Render
const renderList = (state) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    })
}

// The actual Render
const render = () => {
    const state = store.getState()
    console.log(state)
    renderList(state)
}

store.subscribe(render)