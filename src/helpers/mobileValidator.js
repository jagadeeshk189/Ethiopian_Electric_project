export function mobileValidator(number) {
    if (!number) return "Mobile Number can't be empty."
    if (number.length < 10) return 'Mobile must be 10 numbers.'
    return ''
  }
  