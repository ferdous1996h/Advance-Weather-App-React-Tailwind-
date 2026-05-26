export default function onlyTime(data){
  const newTime=new Date(data)
  return newTime.toLocaleTimeString('en-US',{
    hour: "numeric",
    hour12: true
  })
}
