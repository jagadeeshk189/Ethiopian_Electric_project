export function nameValidator(name) {
  if (!name) return "Account can't be empty."
  if (name.length < 12) return 'Account must be 12 numbers.'
  return ''
}
