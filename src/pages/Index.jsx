import { Box, Input, Button, List, ListItem, useToast } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { getClient } from "lib/supabase";

const Index = () => {
  const client = getClient('testproject');
  const toast = useToast();

  const [domain, setDomain] = useState('');
  const [domains, setDomains] = useState([]);

  const handleAddDomain = async () => {
    if (domain) {
      const success = await client.set(`domain-${domain}`, { name: domain });
      if (success) {
        setDomains([...domains, domain]);
        setDomain('');
        toast({
          title: 'Domain added.',
          description: "We've added your domain to the list.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    const loadDomains = async () => {
      const { data } = await client.getWithPrefix('domain-');
      if (data) {
        const loadedDomains = data.map(item => item.value.name);
        setDomains(loadedDomains);
      }
    };
    loadDomains();
  }, []);

  return (
    <Box>
      <Input placeholder="Add new domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      <Button onClick={handleAddDomain}>Add Domain</Button>
      <List>
        {domains.map((domain, index) => (
          <ListItem key={index}>{domain}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;