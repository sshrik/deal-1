import ElementBuilder from '../../lib/ElementBuilder';
import LoadingModal from '../../component/Modal/LoadingModal';
import $ from '../../util/domControll';
import api from '../../util/api';
import './loading.css';

export default class Main extends ElementBuilder {
  constructor(props) {
    super(props);
    const { routeTo, router } = props;
    this.router = router;
    this.routeTo = routeTo;
  }

  fetchData = () => {
    const animationStartTime = new Date().getTime();
    const animationOptions = {
      delayTime: 1800,
      startTime: animationStartTime,
    };

    api
      .fetchGet('/products', animationOptions)
      .then((products) => {
        api.fetchGet('/categories', animationOptions).then((categories) => {
          this.router.route(this.routeTo, {
            props: {
              products: [...products.data],
              categories: [...categories.data],
            },
          });
        });
      })
      .catch((error) => console.log(error));

    /*
    Promise.all([
      api.fetchGet('/products', animationOptions),
      api.fetchGet('/categories', animationOptions),
    ])
      .then(([products, categories]) => {
        this.router.route(this.routeTo, {
          props: {
            products: [...products.data],
            categories: [...categories.data],
          },
        });
      })
      .catch((error) => console.log(error));
      */
  };

  constructElement() {
    const $element = $.create('div').addClass('loading-contianer');

    new LoadingModal({
      parent: this,
    });

    this.fetchData();

    return $element;
  }
}
