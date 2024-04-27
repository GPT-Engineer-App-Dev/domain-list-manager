// Complete the Index page component here
// Use chakra-ui
import { Button } from "@chakra-ui/react"; // example
import { FaPlus } from "react-icons/fa"; // example - use react-icons/fa for icons
import { getClient } from "lib/supabase";

import { useState, useEffect } from "react";

const Index = () => {
  const client = getClient('testproject');
  const key = 'testkey';

  // state mgmt
  const [objects, setObjects] = useState([]);
  const [clicks, setClicks] = useState(0);
  
  // write onClick function
  const handleClick = () => {
    console.log("Button clicked");
    client.set(key, clicks + 1);
    setClicks(clicks + 1);
  };

  // effect
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const client = getClient('testproject');
      const { data, error } = await client.get(key);
      if (error) {
        console.error("error", error);
      } else {
        console.log("data", data);
      }
      setObjects(data);
    };  
    fetchData();
  }, []);

  // TODO: Create the website here!
  return (
    <Button onClick={handleClick} leftIcon={<FaPlus />}>
      Hello world! <FaPlus />
    </Button>
  ); // example
};

export default Index;
