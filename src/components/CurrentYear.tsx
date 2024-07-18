export const CurrentYear = () => {
  const date: Date = new Date();
  return (
    date.getFullYear()
  )
}