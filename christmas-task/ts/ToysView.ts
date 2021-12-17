import Data from '../src/data.json';
import Filter from './Filter';
import FilterController from './FilterController';

class ToysView {

    filter: Filter;

    constructor (filter: Filter) {
        this.filter = filter;
    }

    init() {
        const basicPart = document.querySelector('.main') as HTMLElement;
        basicPart.innerHTML = '';
        const pageContent = document.querySelector('#toys__page') as HTMLTemplateElement;
        basicPart.append(pageContent.content.cloneNode(true));

        const filterController = new FilterController(this.filter, () => this.onFilterUpdated());
        filterController.init();

        const cardHolder = document.querySelector('.main__toys-block');
        for (let info of Data) {
            const cardContent = document.querySelector('#toy__card-template') as HTMLTemplateElement;
            const cardView = cardContent.content.firstElementChild.cloneNode(true) as HTMLDivElement;
            cardHolder.append(cardView);
            cardView.querySelector('.toy-card__text').innerHTML = info.name;
            cardView.querySelector('.amount').innerHTML = info.count;
            cardView.querySelector('.year').innerHTML = info.year;
            cardView.querySelector('.shape').innerHTML = info.shape;
            cardView.querySelector('.color').innerHTML = info.color;
            cardView.querySelector('.size').innerHTML = info.size;
            cardView.querySelector('.favorite').innerHTML = info.favorite;
            cardView.querySelector('.toy-card__content__img').setAttribute("style", `background-image: url(../assets/toys/${info.num}.png)`)
        }
    }

    onFilterUpdated() {
        console.log(this.filter)

        
    }

}

export default ToysView;