export function accountValidator(number) {
  let data = ['123456789012','098765432109']
  console.log("number",number)
    if (!number) return "Account can't be empty."
   //if (data.indexOf(number) == -1) return 'Account number is not correct.'
    if (number.length < 12) return 'Account must be 12 numbers.'
    
    return ''
  }
  