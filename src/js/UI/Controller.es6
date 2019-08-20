import MouseController from './Mouse/Controller.es6'
export default class Controller {
  constructor() {
    this.init();
  }

  init(){
    this.mouse = new MouseController()
  }
}
