import { trace, toJS, spy, observe, observable, action, computed } from "mobx";
import { finished } from "stream";
class Todo{
  id = Math.random()
  @observable title = "";
  @observable finished = false;
  @action.bound toggle(){
    this.finished = !this.finished
  }
  constructor(title){
    this.title = title
  }
}

class Store {
  @observable todos = [];
  @observable activePage = 0;
  disposers = [];
  constructor() {
    // 监控todos
    observe(this.todos, change => {
      //observe方法 返回一个disposer函数，当disposer执行后，observe就停止监视
      this.disposers.forEach(disposer => disposer()); //解除监视
      this.disposers = [];
      //todos = change.object
      for (let todo of change.object) {
        let disposer = observe(todo, change => {
          this.save(); //todo发生变化 保存
          // console.log(change)
        });
        this.save();
        this.disposers.push(disposer);
      }
      console.log(change);
    });
  }
  save() {
    localStorage.setItem("todos", JSON.stringify(toJS(this.todos)));
    console.log(toJS(this.todos)); //immutale
  }
  @action.bound changePage(index){
    this.activePage = index
  }
  @action.bound createTodo(title) {
    this.todos.unshift(new Todo(title));
  }
  @action.bound removeTodo(todo) {
    this.todos.remove(todo); // mobx method
  }
  @action.bound clearAll(){
    this.todos = []
  }
  @computed get left() {
    return this.todos.filter(todo => !todo.finished).length;
  }
  @computed get activeLists(){
    return this.todos.filter(todo=> !todo.finished)
  }
  @computed get completeLists(){
    return this.todos.filter(todo=>todo.finished)
  }
}

export {Store};
