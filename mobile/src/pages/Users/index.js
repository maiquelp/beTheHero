import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../../services/api'

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Users() {

    const [ users, setUsers ] = useState([]);

    const [ total, setTotal ] = useState(0);

    //const [ page, setPage ] = useState(1);

    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(user) {
        navigation.navigate('Detail', user)
    }

    async function loadUsers() {
        if (loading) {
            return
        }

        if (total > 0 && users.length === total) {
            return
        }

        setLoading(true);

        const res = await api.get('user');
        setUsers([...users, ...res.data]);
        setTotal(res.data.length);
        //setPage(page + 1);
        setLoading(false)
    }

    useEffect(() => {
        loadUsers()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} usuários</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos usuários abaixo.</Text>

            <FlatList style={styles.userList} data={users} showsVerticalScrollIndicator={false} 
                keyExtractor={user => String(user.email)}
                onEndReached={loadUsers}
                onEndReachedThreshold={0.2} 
                renderItem={({ item: user}) =>(
                    <View style={styles.user}>
                        <Text style={styles.userProperty}>Nome: </Text>
                        <Text style={styles.userValue}>{user.name}</Text>
                        <Text style={styles.userProperty}>Email: </Text>
                        <Text style={styles.userValue}>{user.email}</Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(user)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>    
                    </View>
                )}
            />
            
        </View>
    );
}