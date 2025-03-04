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

export { isoToDDMMYYYY, NN, phoneFormat }