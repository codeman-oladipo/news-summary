// (function(){
//
// var mylist = {}
// var arr;
// var listItem = [];
//
// mylist.methods = {
//
// checkData : function() {
//     if (this.showTask() !== null ){
// 		arr = this.showTask()
//            } else {
//             arr = []
//            }
// 	  return arr
// 	},
//
// saveTask : function(item){
// 	  this.checkData();
// 	  if (item !== "") {
// 	  	arr.push(item);
//           localStorage.setItem('tasks', JSON.stringify(arr));
//           $('#msgBox').html('<strong>'+ item +'</strong> added to your list').removeClass('list-group-item-danger').addClass('list-group-item-success');
//           } else {
//           $('#msgBox').html('Task cannot be empty').removeClass('list-group-item-success').addClass('list-group-item-danger');
//          }
// 	},
//
// showTask : function(){
// 		var data = JSON.parse(localStorage.getItem('tasks'));
// 		return data;
// 	},
//
// showTaskItem : function(x) {
//        var data = JSON.parse(localStorage.getItem('tasks'));
//        return data[x]
// 	},
//
// removeTask : function() {
// 		localStorage.removeItem('tasks');
// 	},
//
// stackItem : function() {
//       var items = this.showTask()
//      	for (var i in items) {
//   	      listItem[i] = '<li class="list-group-item">'+ items[i] +'</li>';
//   	      var newlistItem = '<ul class="list-group">' + listItem.join('') + '</ul>';
//         }
//       $('#task_list').html(newlistItem);
// 	},
//
// save : function() {
//     document.querySelector('.btn-primary').addEventListener('click', function(){
// 	   mylist.methods.saveTask(document.querySelector('#taskName').value);
// 	   if (mylist.methods.showTask() !== null) {
//        mylist.methods.stackItem();
//          }
//       })
//     },
//
// clearAll : function() {
//     document.querySelector('#cleanBtn').addEventListener('click', function(){
//         mylist.methods.removeTask();
//         $('#task_list li').remove();
//   })
// },
//
// savekey : function() {
//         document.getElementById('taskName').addEventListener('keypress', function(e){
//     if (e.which == 13) {
//        $('.btn-primary').trigger('click')
//     }
//       })
//     }
// }
//
// mylist.methods.stackItem();
// mylist.methods.save();
// mylist.methods.clearAll();
// mylist.methods.savekey();
//
// })()

function saveToLocalStorage(){
  this.storageObject = [];
  this.saveItem = function(item){
    this.storageObject.push(item);
    localStorage.setItem('preferedChannels', JSON.stringify(arr));
  };
  this.resetAll = function(){
    localStorage.removeItem('preferedChannels');
  }
}

function saveItem(item){
  this.storageObject.push(item);
  localStorage.setItem('preferedChannels', JSON.stringify(arr));
}

function resetAll(){
  localStorage.removeItem('preferedChannels');
}
