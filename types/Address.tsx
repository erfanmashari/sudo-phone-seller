type AddressType = {
    province: string,
    city: string,
    plaque: string,
    postalAddress: string,
    postalCode: string,
    isMeReceiver: boolean,
    receiverSpecifications: {
      firstName: string,
      lastName: string,
      phoneNumber: string,
    },
    unit?: string,
};

export default AddressType;
