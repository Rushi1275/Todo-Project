function saveTask(event) {
  event.preventDefault();
  const todoName = document.getElementById("todoName").value;
  const description = document.getElementById("description").value;

  let user = {
    todoName: todoName,
    description: description,
  };

  axios
    .post(
      "https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/todo",
      user
    )
    .then((response) => {
      newTask(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

//  to avoid disappearing ele after refresh
window.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    axios.get("https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/todo"),
    axios.get(
      "https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/complete"
    ),
  ])
    .then((responses) => {
      const todoResponse = responses[0];
      const completeResponse = responses[1];

      for (let i = 0; i < todoResponse.data.length; i++) {
        newTask(todoResponse.data[i]);
      }

      for (let i = 0; i < completeResponse.data.length; i++) {
        completeScreen(completeResponse.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});



function newTask(user) {
  const parentEle = document.getElementById("new_task");
  const childEle = `<li id='${user._id}'> Todo Name : ${user.todoName} / Description : ${user.description}
                      <button onclick= CompletedTask('${user._id}') class="btn"> Completed </button> 
                      <button onclick= deleteUser('${user._id}') class="btn">Delete </button>
                      </li>`;

  parentEle.innerHTML = parentEle.innerHTML + childEle;
  // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
}

function completeScreen(compData) {
  const parentEle = document.getElementById("completed");
  const childEle = `<li id='${compData._id}'> Todo Name : ${compData.todoName} / Description : ${compData.description}
            <button onclick= deleteUserComp('${compData._id}')  class="btn">Delete </button>
                      </li>`;

  parentEle.innerHTML = parentEle.innerHTML + childEle;
  // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
}

function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/todo/${userId}`
    )
    .then(() => {
      const elementToDelete = document.getElementById(userId);
      if (elementToDelete) {
        elementToDelete.remove();
      } else {
        console.log("Element not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteUserComp(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/complete/${userId}`
    )
    .then(() => {
      const elementToDelete = document.getElementById(userId);
      if (elementToDelete) {
        elementToDelete.remove();
      } else {
        console.log("Element not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function CompletedTask(userId) {
  axios
    .get(
      `https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/todo/${userId}`
    )
    .then((response) => {
      const taskData = response.data;

      let compData = {
        todoName: taskData.todoName,
        description: taskData.description,
      };

      axios
        .post(
          "https://crudcrud.com/api/4e0e7206fe3f43bab220aa89173927a4/complete",
          compData
        )
        .then((response) => {
          completeScreen(response.data);
        })
        .then(() => {
          // console.log('added')
          deleteUser(taskData._id);
        });
    });
}
