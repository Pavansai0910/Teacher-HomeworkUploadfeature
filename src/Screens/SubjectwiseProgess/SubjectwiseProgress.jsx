import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {
  createTimetable,
  getStudentsTopicWisePerformance,
  getStudentSubjects,
  getChapters,
} from '../../Services/StudentAPIV1';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDateTimestamp } from '../../Utils/formatDate';
import { AuthContext } from '../../Context/AuthContext';
import LeftArrowIconBlue from '../../Images/svg/LeftArrowIconBlue';
import GetFontSize from '../../Commons/GetFontSize';
import DropDownArrow from '../../Images/svg/DropdownArrow';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SubjectWiseProgress() {
  const [allSubjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({
    _id: '',
    subjectName: '',
  });
  const [topics, setTopics] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [selectedChapter, setSelectedChapter] = useState({ id: '', name: '' });
  const [allChapters, setAllChapters] = useState([]);

  const { studentProfile } = useContext(AuthContext);

  const [chapterClicked, setChapterClicked] = useState(false);
  const [subjectClicked, setSubjectClicked] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const response = await getStudentSubjects({
          studentId: studentProfile?._id,
        });
        if (response?.data?.subjects?.length > 0) {
          setSubjects(response.data.subjects);
          setSelectedSubject(response.data.subjects[0]);
        } else {
          Toast.show({
            type: 'error',
            text1: 'No subjects found',
          });
        }
      } catch (error) {
        if (response.status !== 404 && response.status !== 400) {
          Toast.show({
            type: 'error',
            text1: 'Unable to load subjects.',
          });
        }
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject?._id) return;

      try {
        const response = await getChapters({
          classId: studentProfile?.classId?._id,
          subjectId: selectedSubject?._id,
          boardId: studentProfile?.schoolId?.boardId,
        });
        setAllChapters(response.data.chapters);
        setSelectedChapter(response.data.chapters[0]);
      } catch (error) {
        // console.error(error);
        // if (error.response.status != 400 && error.response.status != 404) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Unable to fetch chapters',
        //   });
        // }
      }
    };

    if (selectedSubject) {
      fetchChapters();
    }
  }, [selectedSubject]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedChapter) return;

      setLoadingTopics(true);
      try {
        const response = await getStudentsTopicWisePerformance({
          studentId: studentProfile?._id,
          classId: studentProfile?.classId?._id,
          subjectId: selectedSubject._id,
          chapterId: selectedChapter?.id,
          boardId: studentProfile?.schoolId?.boardId,
        });
        setTopics(response.data.performance);
        setLastUpdated(response.data.lastUpdated);
      } catch (error) {
        // console.error(error);
        // if (error.response.status !== 404 && error.response.status !== 400) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'No topics available for this subject.',
        //   });
        // }
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [selectedSubject, selectedChapter]);

  useEffect(() => {
    const generateTimetable = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const lastGenerated = await AsyncStorage.getItem(
          'timetableLastGenerated',
        );
        if (lastGenerated !== today) {
          await createTimetable({ studentId: studentProfile?._id });
          await AsyncStorage.setItem('timetableLastGenerated', today);
        }
      } catch (err) {
        // Handle error silently or log if needed
      }
    };
    if (studentProfile?._id) {
      generateTimetable();
    }
  }, [studentProfile?._id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-[30px]">
        <View className="flex flex-row justify-start items-center">
          <TouchableOpacity
            className="ml-4 flex flex-row justify-center items-center "
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrowIconBlue />
            <Text
              style={{ fontSize: GetFontSize(18) }}
              className="ml-3 font-poppins600 text-[#33569F]">
              Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-[18px] border-[1px] border-[#007AFF1A]"></View>

      {/* Subject Dropdown */}
      {!loadingSubjects && (
        <View>
          <Text
            style={{ fontSize: GetFontSize(16) }}
            className="mt-5 ml-5 text-black font-poppins500 text-left">
            Chapter wise progress in
          </Text>

          <View className="flex flex-row items-center gap-2 px-5 pt-3">
            <View className="w-[45%]">
              <TouchableOpacity
                onPress={() => setSubjectClicked(!subjectClicked)}
                className="h-[32px] px-2 flex flex-row items-center border border-[#E6F0FF] bg-[#E6F0FF] rounded-md">
                <Text
                  style={{ fontSize: GetFontSize(12) }}
                  className="text-[#5B77B0] font-inter700 line-clamp-1 w-[93%]">
                  {selectedSubject.subjectName
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ') || 'Select Subject'}
                </Text>
                {subjectClicked ? (
                  <DropDownArrow size={16} flip={'up'} color={'#5B77B0'} />
                ) : (
                  <DropDownArrow size={16} flip={'down'} color={'#5B77B0'} />
                )}
              </TouchableOpacity>

              {/* Dropdown Options */}
              {subjectClicked && (
                <View className="absolute z-10 top-10 w-full h-auto bg-[#E6F0FF] rounded-md">
                  {allSubjects.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="w-full h-[30px] flex justify-center"
                      onPress={() => {
                        setSelectedSubject(item);
                        setSubjectClicked(false);
                      }}>
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="py-1 px-2 text-[#5B77B0] font-inter700 line-clamp-1">
                        {item.subjectName
                          .split(' ')
                          .map(
                            word =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="w-[52%]">
              <TouchableOpacity
                onPress={() => setChapterClicked(!chapterClicked)}
                className="h-[32px] px-2 flex flex-row items-center bg-[#E6F0FF] border border-[#E6F0FF] rounded-md">
                <Text
                  ellipsizeMode='tail'
                  style={{ fontSize: GetFontSize(12) }}
                  className="text-[#5B77B0] font-inter700 line-clamp-1 w-[93%]">
                  {selectedChapter.name || 'Select Chapter'}
                </Text>
                {chapterClicked ? (
                  <DropDownArrow size={16} flip={'up'} color={'#5B77B0'} />
                ) : (
                  <DropDownArrow size={16} flip={'down'} color={'#5B77B0'} />
                )}
              </TouchableOpacity>

              {/* Dropdown Options */}
              {chapterClicked && (
                <View className="absolute z-10 top-10 w-full h-auto bg-[#E6F0FF] rounded-md">
                  {allChapters.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="w-full h-[30px] flex justify-center"
                      onPress={() => {
                        setSelectedChapter(item);
                        setChapterClicked(false);
                      }}>
                      <Text
                        ellipsizeMode='tail'
                        style={{ fontSize: GetFontSize(12) }}
                        className="py-1 px-2 text-[#5B77B0] font-inter700 line-clamp-1">
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Topics Section */}
      <ScrollView className="flex-1 bg-white pb-3 px-3 mt-0">
        {loadingTopics ? (
          <View className="flex justify-center items-center h-36">
            {/* <View className="w-8 h-8 border-4 border-gray-300 border-t-[#0976A9] rounded-full animate-spin"></View> */}
            <ActivityIndicator size="large" color="#06286E" />
          </View>
        ) : !loadingSubjects && topics.length === 0 ? (
          <Text className="text-[#000] text-center pt-20">
            No topics available for this subject.
          </Text>
        ) : (
          <View className="overflow-y-auto overflow-x-hidden scrollbar-student rounded-lg text-[14px]">
            {topics &&
              topics.map((topic, index) => (
                <View key={index} className="px-3 pt-3">
                  <View className="flex justify-between mb-4">
                    <Text
                      style={{ fontSize: GetFontSize(14) }}
                      className="font-poppins500 text-[#000]">
                      {topic.topicName}
                    </Text>
                    <Text
                      style={{ fontSize: GetFontSize(10) }}
                      className="font-poppins400 text-[#000]">
                      Last updated:{formatDateTimestamp(lastUpdated) || ''}{' '}
                    </Text>
                  </View>

                  <View className="flex flex-row">
                    <View className="w-1/3 border border-black p-2 min-h-[120px] rounded-l-md">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="text-[#059669] font-poppins600 mb-2">
                        Strength Zone
                      </Text>
                      {topic.learningObjectives.strong.length > 0 ? (
                        <Text
                          style={{ listStyleType: 'disc', paddingLeft: '4px' }}>
                          {topic.learningObjectives.strong.map((sub, i) => (
                            <Text
                              style={{ fontSize: GetFontSize(10) }}
                              key={i}
                              className="font-inter500 text-[#000] text-ellipses hyphens-auto">
                              {sub}
                            </Text>
                          ))}
                        </Text>
                      ) : (
                        <Text
                          style={{ fontSize: GetFontSize(10) }}
                          className="text-[#000] font-inter500 text-center">
                          No Strong Objectives
                        </Text>
                      )}
                    </View>
                    <View className="w-1/3 border-t border-b border-black p-2 min-h-[120px]">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="text-[#d97706] font-poppins600 mb-2">
                        Learning Zone
                      </Text>
                      {topic.learningObjectives.medium.length > 0 ? (
                        <Text
                          style={{ listStyleType: 'disc', paddingLeft: '4px' }}>
                          {topic.learningObjectives.medium.map((sub, i) => (
                            <Text
                              style={{ fontSize: GetFontSize(10) }}
                              key={i}
                              className="font-inter500 text-[#000] text-ellipses hyphens-auto">
                              {sub}
                            </Text>
                          ))}
                        </Text>
                      ) : (
                        <Text
                          style={{ fontSize: GetFontSize(10) }}
                          className="text-[#000] font-inter500 text-center">
                          No Learning Objectives
                        </Text>
                      )}
                    </View>
                    <View className="w-1/3 border border-black p-2 min-h-[120px] rounded-r-md">
                      <Text
                        style={{ fontSize: GetFontSize(12) }}
                        className="text-[#dc2626] text-[14px] font-poppins600 mb-2">
                        Focus Area
                      </Text>
                      {topic.learningObjectives.weak.length > 0 ? (
                        <Text
                          style={{ listStyleType: 'disc', paddingLeft: '4px' }}>
                          {topic.learningObjectives.weak.map((sub, i) => (
                            <Text
                              style={{ fontSize: GetFontSize(10) }}
                              key={i}
                              className="font-inter500 text-[#000] text-ellipses hyphens-auto ">
                              {sub}
                            </Text>
                          ))}
                        </Text>
                      ) : (
                        <Text
                          style={{ fontSize: GetFontSize(10) }}
                          className="text-[#000] font-inter500 text-center">
                          No weak Objectives
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SubjectWiseProgress;
