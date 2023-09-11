import { View, Text, TouchableOpacity } from 'react-native'

export default HomeSscreen = ({ navigation }) => {


    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableOpacity
                onPress={() => navigation.push('GameScreen')}
                style={{
                    width: 200,
                    height: 100,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#007DB8',
                    elevation: 10
                }}
            >
                <Text
                style={{
                    fontSize: 20,
                    color: '#007DB8'
                }}
                >Search Game</Text>
            </TouchableOpacity>
        </View>
    )
}