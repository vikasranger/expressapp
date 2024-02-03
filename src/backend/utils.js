
export function getPrompts(data)
{
  const res = [];
  if(data)
  {
    for(let i = 0; i < data.length; i++)
    {
      const chunk = data[i];
      console.log(chunk);
      const prompt = {
        _action: "AddCustomer",
        _execute: "send",
        Name: chunk.name,
        ID: chunk.id,
        Price: chunk.price,
        Type: chunk.type,
        Available: chunk.available,
        ManufacturedBy: chunk.manufacturer_name
      };
      res.push(prompt);
    }
  }

  return res;
}
