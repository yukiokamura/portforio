import HoverTextController from './HoverText/Controller.es6';
export default class Controller {
  constructor() {
    this.$dom = $('.mouse');

    this.init();

  }


  init(){
    this.hoverTextController = new HoverTextController();
    this.setPosition();
    this.setEvent();
  }


  show(){
    if(this.$dom.hasClass('showing'))return;
    this.$dom.addClass('showing');
    const tl = new TimelineMax();
    tl.set(this.$dom,{
      x:$(window).innerWidth()/2,
      y:$(window).innerHeight()/2,
    }).to(this.$dom,1,{
      scale:1
    })
    .add(e=>{
      this.$dom.addClass('active');
      this.$dom.addClass('showing');
    })
  }

  setEvent(){
    $(window).on('mousemove',e=>{
      this.setPosition(e.clientX,e.clientY);
    })
    this.hover();
    this.loop();
  }


  hover(){
    $('.menu .hover').hover(
      e=>{
        this.hoverTextController.show($(e.currentTarget).attr('data-key'))
      },
      e=>{
        this.hoverTextController.hide();
      })
  }


  setPosition(x,y){
    if(!this.$dom.hasClass('active')){
      this.show();
    }else{
      this.position = {
        x:x,
        y:y
      }
    }
  }




  loop(){
    window.requestAnimationFrame(e=>{
      this.loop();
    });
    if(!this.$dom.hasClass('active'))return;
    if(!this.position)return;
    const position = {
      x:this.$dom.offset().left,
      y:this.$dom.offset().top
    };
    const [marginx,marginy] = [this.position.x > $(window).width()/2 ? 30 : -30,this.position.y > $(window).height()/2 ? 30 : -30]
    const direction = {
      x:(position.x - this.position.x + marginx) / ($(window).width()/50),
      y:(position.y - this.position.y + marginy) / ($(window).height()/50),
    }
    TweenMax.set(this.$dom,{
      x:position.x-direction.x,
      y:position.y-direction.y
    })
  }


}
