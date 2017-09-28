export default function(text = 'hello world') {
  const ele = document.createElement('div')
  ele.innerHTML = text
  return ele
}