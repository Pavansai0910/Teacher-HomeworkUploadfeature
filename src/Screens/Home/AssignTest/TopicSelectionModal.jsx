import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Vibration
} from 'react-native';
import GetFontSize from '../../../Commons/GetFontSize';

const TopicSelectionModal = ({
  visible,
  onClose,
  examData,
  loading,
  selectedTopic,
  onTopicSelect,
  activeFilter,
  setActiveFilter,
  chapterName,
}) => {
  const getFilteredExamData = () => {
    if (activeFilter === 'all') return examData;

    return examData?.filter(paper => {
      let status;
      if (paper.isAssigned && paper.lastAttempted) status = 'completed';
      else if (paper.isAssigned) status = 'assigned';
      else status = 'pending';

      return status === activeFilter;
    });
  };

  const statusCounts = {
    all: examData?.length || 0,
    pending: examData?.filter(p => !p.isAssigned && !p.lastAttempted)?.length,
    assigned: examData?.filter(p => p.isAssigned && !p.lastAttempted)?.length,
    completed: examData?.filter(p => p.isAssigned && p.lastAttempted)?.length,
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'assigned':
        return {
          bg: '#E6EFFA',
          text: '#025ECA',
          label: 'Assigned',
          borderColor: '#025ECA'
        };
      case 'completed':
        return {
          bg: '#E9FBF3',
          text: '#189F3F',
          label: 'Completed',
          borderColor: '#189F3F'
        };
      case 'pending':
        return {
          bg: '#FEF6EB',
          text: '#FFB133',
          label: 'Pending',
          borderColor: '#FFC466',
        };
      default:
        return {
          bg: '#F3F4F6',
          text: '#6B7280',
          label: 'Pending',
          borderColor: '#FFC466'
        };
    }
  };

  const getFilteredExam = getFilteredExamData();

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 bg-[#FEDB85]"
        style={{
          borderWidth: 2,
          borderColor: '#DC9047',
          borderStyle: 'solid'
        }}
      >
        {/* Modal Header */}
        <View className="px-6 pt-12 pb-4 border-b-2 border-[#F7F7F5]">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="text-[#B68201] font-inter700"
            >
              Select Topic
            </Text>
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);

                onClose()
              }}
              className="w-8 h-8 bg-white rounded-full justify-center items-center"
            >
              <Text className="text-[#B68201] font-inter600">✕</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontSize: GetFontSize(12) }}
            className="text-[#B68201] font-inter500"
          >
            Here is the list of topics from{' '}
            <Text className="font-inter700">{chapterName}</Text>.{'\n'}{'\n'}
            Select a topic you want to assign a test for.
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="px-6 pt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="px-3 py-2 rounded-full border-2 flex items-center justify-center"
                style={{
                  height: 36,
                  backgroundColor: 'white',
                  borderColor: activeFilter === 'all' ? '#A17F5E' : '#E5E5E5'
                }}
                onPress={() => {
                  Vibration.vibrate(50);
                  setActiveFilter('all')
                }
                } activeOpacity={1}
              >
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className={`font-inter600 ${activeFilter === 'all'
                      ? 'text-[#A17F5E]'
                      : 'text-[#6B7280]'
                    }`}
                  numberOfLines={1}
                >
                  All Tests ({statusCounts.all})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-3 py-2 rounded-full border-2 flex items-center justify-center"
                style={{
                  height: 36,
                  backgroundColor: 'white',
                  borderColor: activeFilter === 'pending' ? '#A17F5E' : '#E5E5E5'
                }}
                onPress={() => {
                  Vibration.vibrate(50);

                  setActiveFilter('pending')
                }
                }
                activeOpacity={1}
              >
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className={`font-inter600 ${activeFilter === 'pending'
                      ? 'text-[#A17F5E]'
                      : 'text-[#6B7280]'
                    }`}
                  numberOfLines={1}
                >
                  Pending ({statusCounts.pending})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-3 py-2 rounded-full border-2 flex items-center justify-center"
                style={{
                  height: 36,
                  backgroundColor: 'white',
                  borderColor: activeFilter === 'assigned' ? '#A17F5E' : '#E5E5E5'
                }}
                onPress={() => {
                  Vibration.vibrate(50);
                  setActiveFilter('assigned')
                }
                } activeOpacity={1}
              >
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className={`font-inter600 ${activeFilter === 'assigned'
                      ? 'text-[#A17F5E]'
                      : 'text-[#6B7280]'
                    }`}
                  numberOfLines={1}
                >
                  Assigned ({statusCounts.assigned})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-3 py-2 rounded-full border-2 flex items-center justify-center"
                style={{
                  height: 36,
                  backgroundColor: 'white',
                  borderColor: activeFilter === 'completed' ? '#A17F5E' : '#E5E5E5'
                }}
                onPress={() => {
                  Vibration.vibrate(50);

                  setActiveFilter('completed')
                }
                }
                activeOpacity={1}
              >
                <Text
                  style={{ fontSize: GetFontSize(13) }}
                  className={`font-inter600 ${activeFilter === 'completed'
                      ? 'text-[#A17F5E]'
                      : 'text-[#637381]'
                    }`}
                  numberOfLines={1}
                >
                  Completed ({statusCounts.completed})
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Topics List */}
        <ScrollView className="flex-1 px-6 pb-6">
          {loading ? (
            <View className="py-8">
              <ActivityIndicator size="large" color="#B68201" />
            </View>
          ) : !examData || examData.length === 0 ? (
            <View className="py-8">
              <Text
                style={{ fontSize: GetFontSize(14) }}
                className="text-center text-[#B68201] font-inter500"
              >
                No exams available.
              </Text>
            </View>
          ) : (
            <View className="gap-3 items-center">
              {getFilteredExam.map(paper => {
                const isSelected = selectedTopic?._id === paper._id;
                let status;
                if (paper.isAssigned && paper.lastAttempted)
                  status = 'completed';
                else if (paper.isAssigned) status = 'assigned';
                else status = 'pending';

                const statusBadge = getStatusBadge(status);

                return (
                  <TouchableOpacity
                    key={paper._id}
                    className={`w-[94%] py-3 justify-between rounded-[16px] px-[14px] ${isSelected ? 'bg-[#F59E0B]' : 'bg-white'
                      } flex-row items-center`}
                    style={{
                      borderTopWidth: 1.5,
                      borderRightWidth: 2.5,
                      borderBottomWidth: 4,
                      borderLeftWidth: 2.5,
                      borderColor: '#DC9047',
                      borderStyle: 'solid'
                    }}
                    onPress={() => {
                      Vibration.vibrate(50);
                      onTopicSelect(paper);
                      onClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={{ fontSize: GetFontSize(14) }}
                      className={`flex-1 font-inter600 ${isSelected ? 'text-white' : 'text-[#637381]'
                        }`}
                      numberOfLines={2}
                    >
                      {paper.questionPaperTitle}
                    </Text>

                    <View
                      className={`ml-3 h-[27px] rounded-full px-[10px] justify-center items-center`}
                      style={{
                        backgroundColor: statusBadge.bg,
                        borderTopWidth: 0.5,
                        borderRightWidth: 1,
                        borderBottomWidth: 2,
                        borderLeftWidth: 1,
                        borderColor: statusBadge.borderColor,
                        borderStyle: 'solid'
                      }}
                    >
                      <Text
                        className="font-inter500"
                        style={{
                          fontSize: GetFontSize(12),
                          color: statusBadge.text,
                        }}
                        numberOfLines={1}
                      >
                        {statusBadge.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TopicSelectionModal;