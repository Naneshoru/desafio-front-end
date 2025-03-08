/**
 * @param isoString '2019-12-02T00:00:00.000Z'
 * @returns '11/02/2020'
 * (no Brasil)
 */
const isoToDDMMYYYY = (isoString: string) => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${NN(day)}/${NN(month)}/${year}`
}

/**
 * @param value '3'
 * @returns '03'
 */
const NN = (value: number) => {
  const stringValue = value.toString()
  if (value == null || stringValue.length > 2) {
    throw('Para resultar em dois dígitos, o número fornecido não pode ser completado com 0')
  }
  else if (stringValue.length === 1) {
    return `0${stringValue}`
  }

  return value
}

/**
 * @param phone '5544999995555'
 * @returns '+55 (54) 99999-5555'
 */
const phoneFormat = (phone: string) => {
  if (phone.length === 13) {
    const countryCode = phone.slice(0, 2)
    const areaCode = phone.slice(2, 4)
    const mainPart = phone.slice(4, 9)
    const lastPart = phone.slice(9, 13)
    
    return `+${countryCode} (${areaCode}) ${mainPart}-${lastPart}`
  } else if (phone.length === 12) {
    const countryCode = phone.slice(0, 2)
    const areaCode = phone.slice(2, 4)
    const mainPart = phone.slice(4, 8)
    const lastPart = phone.slice(8, 12)
    
    return `+${countryCode} (${areaCode}) ${mainPart}-${lastPart}`
  }
  return phone
}

/**
 * @param text 'John Doe'
 * @returns 'JD'
 */
const getInitials = (text: string) => {
  const words = text.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

function abbreviateMiddleNames(fullName: string, limit: number = 25) {
 const nameParts = fullName.split(' ');

 if (fullName.length <= limit) {
     return fullName;
 }

 const firstName = nameParts[0];

 const middleNames = nameParts.slice(1, -1);

 const lastName = nameParts[nameParts.length - 1];

 const abbreviateName = (name: string) => {
     if (name === name.toLowerCase()) {
         return name;
     }
     return name.charAt(0) + '.';
 };

 for (let i = middleNames.length - 1; i >= 0; i--) {
     middleNames[i] = abbreviateName(middleNames[i]);

     const currentName = `${firstName} ${middleNames.join(' ')} ${lastName}`;

     if (currentName.length <= limit) {
         return currentName;
     }
 }

 const abbreviatedLastName = abbreviateName(lastName);
 const finalName = `${firstName} ${middleNames.join(' ')} ${abbreviatedLastName}`;

 return finalName;
}


export { isoToDDMMYYYY, NN, phoneFormat, getInitials, abbreviateMiddleNames }