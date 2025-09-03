export function getAddressesForUser(email) {
  const allAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
  return allAddresses.filter(addr => addr.userId === email);
}

export function addAddress(email, newAddress) {
  const allAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
  const addressToAdd = {
    id: `addr_${Date.now()}`,
    userId: email,
    ...newAddress
  };
  allAddresses.push(addressToAdd);
  localStorage.setItem('addresses', JSON.stringify(allAddresses));
  return addressToAdd;
}

export function deleteAddress(addressId) {
  let allAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
  allAddresses = allAddresses.filter(addr => addr.id !== addressId);
  localStorage.setItem('addresses', JSON.stringify(allAddresses));
}