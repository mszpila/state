export class CreateOfferStore {
  @observable
  public data = {};

  @observable
  public menuPath = [];

  @observable
  public isPopUpActive = false;

  @observable
  public popUpType = '';

  @observable
  public popUpDepth = 0;

  @observable
  public category = '';

  @observable
  public brand = '';

  @observable
  public color = '';

  @observable
  public size = '';

  @observable
  public price = 0;

  @observable
  public deposit = 0;

  @observable
  public images = [];

  @observable
  public selectedImage = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  public togglePopUp = (): void => {
    this.isPopUpActive = !this.isPopUpActive;
    console.log(this.isPopUpActive);
  };

  @action
  public setPopUpType = (type: string): void => {
    this.popUpType = type || 'haha';
    console.log(this.popUpType);
  };

  @action
  public setCategory = (category: string): void => {
    this.category = category;
  };

  @action
  public setBrand = (brand: string): void => {
    this.brand = brand;
  };

  @action
  public setSize = (size: string): void => {
    this.size = size;
  };

  @action
  public setColor = (color: string): void => {
    this.color = color;
  };

  @action
  public setPrice = (price: number): void => {
    this.price = price;
  };

  @action
  public setDeposit = (deposit: number): void => {
    this.deposit = deposit;
  };

  @action
  public setSelectedImage = (imageIndex: number): void => {
    this.selectedImage = imageIndex;
  };

  @action
  public addPathToMenu = (path: string): void => {
    this.menuPath.push(path);
    console.log('new path', this.menuPath);
  };

  @action
  public removePathToMenu = (): void => {
    this.menuPath.pop();
    console.log('new path', this.menuPath);
  };

  @action
  public resetMenuPath = (): void => {
    this.menuPath = [];
    console.log(this.menuPath);
  };

  @action
  public setPopUpDepth = (depth: number): void => {
    this.popUpDepth = depth;
  };

  @action
  public setImages = (images: []): void => {
    this.images = images;
  };

  @action
  public fetchData = async (): Promise<void> => {
    this.data = {
      category: {
        jackets: {
          short: 'leaf',
          long: 'leaf'
        }
      },
      brand: {
        adidas: 'leaf',
        nike: 'leaf',
        '4f': 'leaf',
        reebok: 'leaf',
        puma: 'leaf',
      },
      size: {
        shoes: {
          small: 'leaf',
          medium: 'leaf',
          large: 'leaf'
        },
        clothes: {
          xs: 'leaf',
          s: 'leaf',
          m: 'leaf',
          l: 'leaf',
          xl: 'leaf',
        }
      },
      color: {
        red: 'leaf',
        blue: 'leaf',
        black: 'leaf',
        white: 'leaf',
        yellow: 'leaf',
        pink: 'leaf',
        green: 'leaf',
      }
    };
  };
}
