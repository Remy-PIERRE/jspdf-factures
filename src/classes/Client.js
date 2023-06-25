class Client {
  constructor(data) {
    this.name = data.name;
    this.address = {
      street: data.address,
      postal_code: data.postal_code,
      city: data.city,
      country: data.country,
    };
    this.email = data.email;
    this.phone = data.phone;
  }
}

export default Client;
