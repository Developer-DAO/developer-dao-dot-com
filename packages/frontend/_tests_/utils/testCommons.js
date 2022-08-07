function testCommonLink(element, linkAddress) {
  expect(element).toBeInTheDocument();
  expect(element.closest('a')).toHaveAttribute('href', linkAddress);
}

export default testCommonLink;
