export class ProductCard {
    constructor(root, shoppingCart) {
        this.root = root;
        this.shoppingCart = shoppingCart;
        this.id = this.root.data('id');
        this.thumbnail = this.root.data('thumbnail');

        this.cacheNodes();
        this.bindEvents();
    }

    cacheNodes() {
        this.nodes = {
            addingButton: this.root.find('.js-adding-button')
        }
    }

    bindEvents() {
        this.nodes.addingButton.on('click', () => this.addProduct());
    }

    addProduct() {
        event.preventDefault();
        this.shoppingCart.addProduct(this);
    }
}