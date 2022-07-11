export function getContentBetweenTags(before: string, after: string) {
  return (content: string) => {
    const beforeIndex = content.indexOf(before);
    const afterIndex = content.indexOf(after);
    if (beforeIndex === -1 || afterIndex === -1) {
      return '';
    }
    return content.substring(beforeIndex + before.length, afterIndex);
  };
}
