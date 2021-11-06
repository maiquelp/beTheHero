import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text, Linking, FlatList } from 'react-native';
import api from '../../services/api'
//import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const user = route.params;

    const [ assets, setAssets ] = useState([]);

    const [ loading, setLoading ] = useState(false);
   
    function navigateBack() {
        navigation.goBack()
    };

    function getAssetPercent(value) {
        let total = 0;
        let percent = 0;
        if (assets.length >= 1) {
          assets.map(e => {
            total = total + e.value
          });
          
          percent = value / total * 100
          return percent.toFixed(2)
        }
    };

    async function loadAssets() {
        if (loading) {
            return
        }

        setLoading(true);

        const res = await api.get(`mobileasset/${user.id}`);
        setAssets([...res.data]);
      
        setLoading(false)
    }

    useEffect(() => {
        loadAssets()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e02041' />
                </TouchableOpacity>
            </View>
           
            <FlatList data={assets} showsVerticalScrollIndicator={false} 
                keyExtractor={asset => String(asset.id)}
                onEndReached={loadAssets}
                onEndReachedThreshold={0.2} 
                renderItem={({ item: asset}) =>(
                    <View style={styles.asset}>
                        <Text style={styles.assetProperty}>Ativo: {asset.title}</Text>
                        <Text style={styles.assetProperty}>Valor: {asset.value} </Text>
                        <Text style={styles.assetProperty}>Allocation: {getAssetPercent(asset.value)}%</Text>
                    </View>
             )}
             />

            {/* <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
}