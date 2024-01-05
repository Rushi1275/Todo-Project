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
      "https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/todo",
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
  axios
    .get("https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/todo")
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        newTask(response.data[i]);
        //  CompletedTask(response.data[i])
      }
    });

  axios
    .get("https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/complete")
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        completeScreen(response.data[i]);
        //  CompletedTask(response.data[i])
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//  to avoid disappearing ele after refresh
// window.addEventListener("DOMContentLoaded", () => {
//   axios
//     .get("https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/complete")
//     .then((response) => {
//       for (var i = 0; i < response.data.length; i++) {
//         completeScreen(response.data[i]);
//         //  CompletedTask(response.data[i])
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

function newTask(user) {
  const parentEle = document.getElementById("new_task");
  const childEle = `<li id='${user._id}'> Todo Name : ${user.todoName} / Description : ${user.description}
                      <button onclick= CompletedTask('${user._id}') > ✅ </button> 
                      <button onclick= deleteUser('${user._id}') >❌ </button>
                      </li>`;

  parentEle.innerHTML = parentEle.innerHTML + childEle;
  // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
}

function completeScreen(compData) {
  const parentEle = document.getElementById("completed");
  const childEle = `<li id='${compData._id}'> Todo Name : ${compData.todoName} / Description : ${compData.description}
            <button onclick= deleteUserComp('${compData._id}') >❌ </button>
                      </li>`;

  parentEle.innerHTML = parentEle.innerHTML + childEle;
  // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
}

function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/todo/${userId}`
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
      `https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/complete/${userId}`
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
      `https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/todo/${userId}`
    )
    .then((response) => {
      const taskData = response.data;

      let compData = {
        todoName: taskData.todoName,
        description: taskData.description,
      };

      axios
        .post(
          "https://crudcrud.com/api/82687ccc9e5f4c79ac14f8ed8514c21b/complete",
          compData
        )
        .then(() => {
          // console.log('added')
          deleteUser(taskData._id);
        });
    });
}
