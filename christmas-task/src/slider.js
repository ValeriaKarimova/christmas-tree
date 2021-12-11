import * as noUiSlider from 'nouislider';
import './assets/styles/nouislider.css';

var handlesSlider = document.getElementById('count__range');

noUiSlider.create(handlesSlider, {
    start: [1, 12],
    range: {
        'min': [1],
        'max': [12]
    }
});

var handlesSlider2 = document.getElementById('year__range');

noUiSlider.create(handlesSlider2, {
    start: [1, 12],
    range: {
        'min': [1],
        'max': [12]
    }
});

