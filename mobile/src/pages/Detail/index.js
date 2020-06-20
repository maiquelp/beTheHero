import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params;
    const value = Intl.NumberFormat('pt-BR', { 
        style: 'currency',
        currency: 'BRL'
    }).format(incident.value);
    const message = `Olá ${incident.name}, gostaria de ajudar no caso "${incident.title}", com o valor de ${value}`;

    function navigateBack() {
        navigation.goBack()
    };

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);   
    }
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso "${incident.title}"`,
            recipients: [incident.email],
            body: message,
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e02041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>Ong: </Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                <Text style={styles.incidentProperty}>Caso: </Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                <Text style={styles.incidentProperty}>Valor: </Text>
                <Text style={styles.incidentValue}>{value}</Text>
            </View>

            <View style={styles.contactBox}>
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
            </View>
        </View>
    );
}