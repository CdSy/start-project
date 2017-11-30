export class ShoppingCart {
    constructor(root) {
        this.root = root;
        this.products = [];
        this.cacheNodes();
        this.bindEvents();
    }

    cacheNodes() {
        this.nodes = {
            renderPlace: $('.js-render-place'),
            counter: this.root.find('.js-product-counter')
        }
    }

    bindEvents() {
        this.root.on('click', (event) => this.removeProduct(event));
    }

    addProduct(product) {
        if (this.products.length < 4) {
            this.products.push(product);
            this.render();
        }
    }

    removeProduct(event) {
        if (event.target.classList.contains('js-removing-button')) {
            const instance = $(event.target).parent('.js-product-item').get(0).instance;
            const index = this.products.indexOf(instance);
            
            this.products.splice(index, 1);
            this.render();
        }
    }

    render() {
        let cards = document.createDocumentFragment();

        this.products.forEach((product) => {
            const card = document.createElement('div');
            const cross = document.createElement('div');
            
            card.className = 'item js-product-item';
            card.instance = product;
            cross.className = 'small-cross js-removing-button';
            card.style.backgroundImage = `url('${product.thumbnail}')`;
            card.appendChild(cross);
            cards.appendChild(card);
        });

        this.nodes.counter.empty();
        this.nodes.counter.append(`${this.products.length}`);
        this.nodes.renderPlace.empty();
        this.nodes.renderPlace.append(cards);
    }
}