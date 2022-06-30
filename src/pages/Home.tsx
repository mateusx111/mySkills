import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export function Home() {

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(skillId: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== skillId 
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings('Good Morning')
    }
    else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good Afternoon')
    }else{
      setGreetings('Good Night')
    }

  }, [])

  return (
    <View style={styles.containter}>
      <Text style={styles.title}>
        Welcome, Mateus S. Santos
      </Text>

      <Text style={styles.greetings}>
        {greetings}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button 
      onPress={handleAddNewSkill} 
      title="Add"
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
          skill={item.name} 
          onPress={( )=> handleRemoveSkill(item.id)}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 70,
    backgroundColor: '#121015'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 10,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  },
});