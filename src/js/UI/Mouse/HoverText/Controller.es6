export default class Controller {
  constructor() {
    this.$dom = $('.mouse .txt');
    this.init();
  }

  init(){
    this.$texts = {
      'bg':$('.mouse .txt.txt1')
    }
    this.tl = null;
    this.render();
  }


  render(){
    this.$dom.each((i,e)=>{
      const list = $(e).text().split('');
      const txt = "<span>"+list.join('</span><span>') + '</span>';
      $(e).html(txt);
    })
  }

  show(key){
    const tl = new TimelineMax();
    if(this.tl){
      this.tl.stop();
      this.tl.kill();
    }
    this.$texts[key].find('span').each((i,e)=>{
      tl.to(e,0.4,{
        y:0,
        ease: Power4.easeOut
      },i*0.05)
    })
    this.tl = tl;
  }

  hide(){
    if(!this.tl)return;
    console.log('stop');
    this.tl.stop();
    this.tl.kill();
    const l = this.$dom.find('span').length - 1;
    const tl = new TimelineMax();
    console.log(this.$dom.find('span'));
    this.$dom.find('span').each((i,e)=>{
      tl.to(e,0.4,{
        y:-$(e).height()*1.1,
        ease: Power4.easeIn,
        opacity:0
      },(l - i)*0.05)
      .set(e,{
        clearProps:'all'
      })
    })

  }
}
