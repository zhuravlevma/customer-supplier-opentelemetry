interface Attributes {
  id: string;
  orderId: string;
  description: string;
  information: string;
  codeOfAccounting: string;
  addressOfAccounting: string;
  address?: string;
  money?: string;
}

export class OrderEntity implements Attributes {
  id: string;
  orderId: string;
  description: string;
  information: string;
  codeOfAccounting: string;
  addressOfAccounting: string;
  address?: string;
  money?: string;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.orderId = attributes.orderId;
    this.description = attributes.description;
    this.money = attributes.money;
    this.address = attributes.address;
    this.addressOfAccounting = attributes.addressOfAccounting;
    this.codeOfAccounting = attributes.codeOfAccounting;
    this.information = attributes.information;
  }
}
