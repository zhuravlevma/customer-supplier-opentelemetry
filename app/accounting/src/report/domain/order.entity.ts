interface Attributes {
  id: string;
  orderId: string;
  description: string;
  information: string;
  codeOfWarehouse: string;
  addressOfWarehouse: string;
  address?: string;
  code?: string;
  money?: string;
}

export class OrderEntity implements Attributes {
  id: string;
  orderId: string;
  description: string;
  information: string;
  codeOfWarehouse: string;
  addressOfWarehouse: string;
  code?: string;
  address?: string;
  money?: string;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.orderId = attributes.orderId;
    this.description = attributes.description;
    this.money = attributes.money;
    this.address = attributes.address;
    this.code = attributes.code;
    this.addressOfWarehouse = attributes.addressOfWarehouse;
    this.codeOfWarehouse = attributes.codeOfWarehouse;
    this.information = attributes.information;
  }
}
