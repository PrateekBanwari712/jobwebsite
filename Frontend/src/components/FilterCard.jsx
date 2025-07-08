import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobSlice.js'


const filterData = [{
  filterType: "Location",
  array: ["Delhi", "india", "Banglore",
    "Noida"]
},
{
  filterType: "Role",
  array: ["Frontend Developer", "Backend Developer", "Fullstack developer","Mern stack"]
},

]
const FilterCard = () => {
  
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
   dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg' >Filter Jobs</h1>
      <hr className='mt-3 text-gray-500' />
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg '>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div key={index} className='flex item-center space-x-2 my-2'>
                      <RadioGroupItem
                      className={"hover:cursor-pointer"}
                      value={item}
                        id={itemId}
                      />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard