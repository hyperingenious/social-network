export function formatDate(isoString) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', options);
}

export function extractInitials(inputString) {
    const words = inputString.split(' ');
  
    const initials = words.map(word => {
      if (word.length >= 2) {
        return word.substring(0, 2).toUpperCase();
      } else {
        return word.toUpperCase();
      }
    });
  
    return initials.join('');
  }