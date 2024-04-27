import { Box, Input, Button, List, ListItem, useToast, VStack, Heading, Text } from '@chakra-ui/react';
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

  const handleRemoveDomain = async (domainToRemove) => {
    const success = await client.delete(`domain-${domainToRemove}`);
    if (success) {
      const updatedDomains = domains.filter(domain => domain !== domainToRemove);
      setDomains(updatedDomains);
      toast({
        title: 'Domain removed.',
        description: "The domain has been removed from the list.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const loadDomains = async () => {
      const data = await client.getWithPrefix('domain-');
      if (data) {
        const loadedDomains = data.map(item => item.name);
        setDomains(loadedDomains);
      }
    };
    loadDomains();
  }, []);

  return (
    <Box p={8} maxW="800px" m="auto" mt="5vh" bg="white" boxShadow="lg">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>Domain Management</Heading>
      <Text fontSize="lg" textAlign="center" mb={4}>Manage your domains efficiently and effectively.</Text>
      <VStack spacing={4}>
        <VStack spacing={4}>
          <Input placeholder="Add new domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
          <Button colorScheme="blue" onClick={handleAddDomain}>Add Domain</Button>
        </VStack>
      <List>
        {domains.map((domain, index) => (
          <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px" borderColor="gray.200">
            {domain}
            <Button colorScheme="red" size="sm" onClick={() => handleRemoveDomain(domain)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;