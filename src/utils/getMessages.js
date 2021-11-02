export function getLinkMessages(messages = []) {
  const expression =
    // eslint-disable-next-line no-useless-escape
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regexURL = new RegExp(expression);
  return messages.filter((message) => {
    const textContent = message?.text ?? '';
    return textContent.match(regexURL);
  });
}

export function getVideoMessages(messages = []) {
  return messages.filter((message) => message.type === 'video');
}

export function getImageMessages(messages = []) {
  return messages.filter((message) => message.type === 'image');
}
