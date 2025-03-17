import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Product } from '../../../../model/product';

interface Props {
  modalVisible: boolean
  closeModal: () => void
  product: Product | null
}

const ProductModal = ({ modalVisible, closeModal, product }: Props) => {
  if (!product) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Product Description</Text>
                <Text style={styles.modalText}>{product?.desc ?? ""}</Text>
              </View>
              <View style={styles.divider} />
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  closeButton: {
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
});

export default ProductModal;