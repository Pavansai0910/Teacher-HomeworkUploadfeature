// import { FaArrowRight, FaArrowLeft, FaPlay, FaPause } from "react-icons/fa";
// import Edumetric from "@assets/images/TalkingNotes/Edumetric.svg";
import {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import LeftArrow from '../../Images/svg/LeftArrow';
import GetFontSize from '../../Commons/GetFontSize';
import Dictionary from '../../Commons/Dictionary';
import PlayButton from '../../Images/svg/PlayButton';
import PausedButton from '../../Images/svg/PausedButton';
import SearchIcon from '../../Images/svg/SearchIcon';
import AlertCircleIcon from '../../Images/svg/AlertCircleIcon';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewEnglishUI = () => {
  return (
    <View>
      <Header />
      <MainBody />
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation()
  return (
    <View className="w-screen h-auto bg-[#FFFFFF]">
      <View className="ml-8 mt-5 flex flex-row items-center">
        <TouchableOpacity
        onPress={()=>  navigation.goBack() }>
          <LeftArrow width={20} height={20} />
        </TouchableOpacity>

        <View className="ml-3 w-[2px] h-[35px] bg-[#E2E2E2]"></View>

        <View className="ml-3">
          <Text style={{fontSize: GetFontSize(15)}} className="font-inter500 ">
            Chapter 1
          </Text>
          <Text
            style={{fontSize: GetFontSize(17)}}
            className="font-poppins600 text-[#06286E]">
            The Last Lesson{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MainBody = () => {
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [activeImages, setActiveImages] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);
  const paragraphRefs = useRef([]); // References to paragraph elements
  const scrollViewRef = useRef(null); // Reference to the ScrollView

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveParagraph(prev => (prev + 1) % paragraphs.length); // Loop through paragraphs
        setActiveImages(prev => (prev + 1) % images.length);
      }, 4000); // Change interval duration as needed
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [isPlaying]);

  // Scroll to active paragraph
  useEffect(() => {
    if (paragraphRefs.current[activeParagraph] && scrollViewRef.current) {
      paragraphRefs.current[activeParagraph].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({y, animated: true});
        },
        err => console.error(err),
      );
    }
  }, [activeParagraph]);

  // Array of paragraphs
  const paragraphs = [
    `I started for school very late that morning and was in great dread of a scolding, especially because M. Hamel had said that he would question us on participles, and I did not know the first word about them.`,

    `For a moment I thought of running away and spending the day out of doors. It was so warm, so bright! The birds were chirping at the edge of the woods; and in the open field back of the saw-mill the Prussian soldiers were drilling.`,

    `It was all much more tempting than the rule for participles, but I had the strength to resist, and hurried off to school.`,

    `When I passed the town hall there was a crowd in front of the bulletin-board.For the last two years all our bad news had come from there--the lost battles, the draft, the orders of the commanding officer--and I thought to myself, without stopping:
       
       "What can be the matter now?"`,

    `Then, as I hurried by as fast as I could go, the blacksmith, Wachter, who was there, with his apprentice, reading the bulletin, called after me: 

        "Don't go so fast, bub; you'll get to your school in plenty of time!" `,

    `I thought he was making fun of me, and reached M. Hamel's little garden all out of breath.`,

    `Usually, when school began, there was a great bustle, which could be heard out in the street, the opening and closing of desks, lessons repeated in unison, very loud, with our hands over our ears to understand better, and the teacher's great ruler rapping on the table. But now it was all so still! I had counted on the commotion to get to my desk without being seen; but, of course, that day everything had to be as quiet as Sunday morning.`,

    `Through the window I saw my classmates, already in their places, and M. Hamel walking up and down with his terrible iron ruler under his arm. I had to open the door and go in before everybody. You can imagine how I blushed and how frightened I was.`,

    `But nothing happened, M. Hamel saw me and said very kindly:

        "Go to your place quickly, little Franz. We were beginning without you." `,

    `I jumped over the bench and sat down at my desk. Not till then, when I had got a little over my fright, did I see that our teacher had on his beautiful green coat, his frilled shirt, and the little black silk cap, all embroidered, that he never wore except on inspection and prize days.`,

    `Besides, the whole school seemed so strange and solemn. But the thing that surprised me most was to see, on the back benches that were always empty, the village people sitting quietly like ourselves; old Hauser, with his threecornered hat, the former mayor, the former postmaster, and several others besides. Everybody looked sad; and Hauser had brought an old primer, thumbed at the edges, and he held it open on his knees with his great spectacles lying across the pages.`,

    `While I was wondering about it all, M. Hamel mounted his chair, and, in the same grave and gentle tone which he had used to me, said: 

        "My children, this is the last lesson I shall give you. The order has come from Berlin to teach only German in the schools of Alsace and Lorraine. The new master comes to-morrow. This is your last French lesson. I want you to be very attentive." `,

    `What a thunder-clap these words were to me! 

        Oh, the wretches; that was what they had put up at the town-hall! 

        My last French lesson! Why, I hardly knew how to write! I should never learn any more! I must stop there, then! Oh, how sorry I was for not learning my lessons, for seeking birds' eggs, or going sliding on the Saar! My      books, that had seemed such a nuisance a while ago, so heavy to carry, my grammar, and my history of the saints, were old friends now that I couldn't give up. And M. Hamel, too; the idea that he was going away, that I should never see him again, made me forget all about his ruler and how cranky he was. `,

    `Poor man! It was in honor of this last lesson that he had put on his fine Sunday-clothes, and now I understood why the old men of the village were sitting there in the back of the room. It was because they were sorry, too, that they had not gone to school more. It was their way of thanking our master for his forty years of faithful service and of showing their respect for the country that was theirs no more. `,

    `While I was thinking of all this, I heard my name called. It was my turn to recite. What would I not have given to be able to say that dreadful rule for the participle all through, very loud and clear, and without one mistake? But I got mixed up on the first words and stood there, holding on to my desk, my heart beating, and not daring to look up. `,

    `I heard M. Hamel say to me: 

        "I won't scold you, little Franz; you must feel bad enough. See how it is! Every day we have said to ourselves: 'Bah! I've plenty of time. I'll learn it tomorrow.' And now you see where we've come out. Ah, that's the great trouble with Alsace; she puts off learning till to-morrow. Now those fellows out there will have the right to say to you: 'How is it; you pretend to be Frenchmen, and yet you can neither speak nor write your own language?' But you are not the worst, poor little Franz. We've all a great deal to reproach ourselves with.

        "Your parents were not anxious enough to have you learn. They preferred to put you to work on a farm or at the mills, so as to have a little more money. And I? I've been to blame also. Have I not often sent you to water my flowers instead of learning your lessons? And when I wanted to go fishing, did I not just give you a holiday?" `,

    `Then, from one thing to another, M. Hamel went on to talk of the French language, saying that it was the most beautiful language in the world--the clearest, the most logical; that we must guard it among us and never forget it, because when a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison. Then he opened a grammar and read us our lesson. I was amazed to see how well I understood it. All he said seemed so easy, so easy! I think, too, that I had never listened so carefully, and that he had never explained everything with so much patience. It seemed almost as if the poor man wanted to give us all he knew before going away, and to put it all into our heads at one stroke. `,

    `After the grammar, we had a lesson in writing. That day M. Hamel had new copies for us, written in a beautiful round hand: France, Alsace, France, Alsace. They looked like little flags floating everywhere in the school-room, hung from the rod at the top of our desks. You ought to have seen how every one set to work, and how quiet it was! The only sound was the scratching of the pens over the paper. `,

    `Once some beetles flew in; but nobody paid any attention to them, not even the littlest ones, who worked right on tracing their fish-hooks, as if that was French, too. On the roof the pigeons cooed very low, and I thought to myself: 

        "Will they make them sing in German, even the pigeons?" `,

    `Whenever I looked up from my writing I saw M. Hamel sitting motionless in his chair and gazing first at one thing, then at another, as if he wanted to fix in his mind just how everything looked in that little school-room. Fancy! For forty years he had been there in the same place, with his garden outside the window and his class in front of him, just like that. Only the desks and benches had been worn smooth; the walnut-trees in the garden were taller, and the hop-vine, that he had planted himself twined about the windows to the roof. How it must have broken his heart to leave it all, poor man; to hear his sister moving about in the room above, packing their trunks! For they must leave the country next day. `,

    `But he had the courage to hear every lesson to the very last. After the writing, we had a lesson in history, and then the babies chanted their ba, be, bi, bo, bu. Down there at the back of the room old Hauser had put on his spectacles and, holding his primer in both hands, spelled the letters with them. You could see that he, too, was crying; his voice trembled with emotion, and it was so funny to hear him that we all wanted to laugh and cry. Ah, how well I remember it, that last lesson! `,

    `All at once the church-clock struck twelve. Then the Angelus. At the same moment the trumpets of the Prussians, returning from drill, sounded under our windows. M. Hamel stood up, very pale, in his chair. I never saw him look so tall. `,

    `"My friends," said he, "I--I--" But something choked him. He could not go on. 

        Then he turned to the blackboard, took a piece of chalk, and, bearing on with all his might, he wrote as large as he could:

        "Vive La France!"

        Then he stopped and leaned his head against the wall, and, without a word, he made a gesture to us with his hand; "School is dismissed--you may go." `,
  ];

  const images = [
    require(`../../Images/demoImages/1.webp`),
    require(`../../Images/demoImages/2.webp`),
    require(`../../Images/demoImages/3.webp`),
    require(`../../Images/demoImages/4.webp`),
    require(`../../Images/demoImages/5.webp`),
    require(`../../Images/demoImages/6.webp`),
    require(`../../Images/demoImages/7.webp`),
    require(`../../Images/demoImages/8.webp`),
    require(`../../Images/demoImages/9.webp`),
    require(`../../Images/demoImages/10.webp`),
    require(`../../Images/demoImages/11.webp`),
    require(`../../Images/demoImages/12.webp`),
    require(`../../Images/demoImages/13.webp`),
    require(`../../Images/demoImages/14.webp`),
    require(`../../Images/demoImages/15.webp`),
    require(`../../Images/demoImages/16.webp`),
    require(`../../Images/demoImages/17.webp`),
    require(`../../Images/demoImages/18.webp`),
    require(`../../Images/demoImages/19.webp`),
    require(`../../Images/demoImages/20.webp`),
    require(`../../Images/demoImages/21.webp`),
    require(`../../Images/demoImages/22.webp`),
    require(`../../Images/demoImages/23.webp`),
  ];

  return (
    <SafeAreaView className="w-screen h-screen bg-[#FFFFFF]">

      { !showDictionary && (
          <TouchableOpacity 
          onPress={()=> setShowDictionary(true)}
          className="mt-1 ml-[24px] w-[60%] border-b border-[#696969] ">
        <View className="flex flex-row items-center h-[34px]">
          <View className="ml-2">
            <SearchIcon width={20} height={20} />
          </View>

          <Text className="ml-[6px] text-[#969696]">Looking for Metaphor</Text>

          <View className="mt-2 min-w-[25%] max-w-[80%] overflow-y-scroll  ">
            <View
              placeholderTextColor="#969696"
              className=" font-poppins400 "
              style={{
                fontSize: GetFontSize(12),
                color: '#969696',
              }}
              />
          </View>

          <View className="absolute right-2 ">
            <AlertCircleIcon width={18} height={18} />
          </View>
        </View>
      </TouchableOpacity>
    
    )}

      {showDictionary && (
        <View>
          <View className="mt-1 ml-[24px] w-[60%]">
            <Dictionary dictionaryPlaceholder={"Looking for Metaphor"} />
          </View>
        </View>
      )}

      <View className="mt-3 mx-3">
        <View className="h-[30px] bg-[#F1F6FF] rounded-t-xl ">
          <View className="ml-3">
            <TouchableOpacity
              className="inline-flex justify-center"
              onPress={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <PausedButton size={26} />
              ) : (
                <PlayButton size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-3 inline-flex justify-center items-center">
          <Image
            source={images[activeImages]}
            style={{width: '204', height: '204', borderRadius: 32}}
          />
        </View>
        <ScrollView ref={scrollViewRef} className="mt-3">
          {paragraphs.map((eachParaagrapth, index) => (
            <Text
              key={index}
              ref={el => (paragraphRefs.current[index] = el)}
              style={{
                fontSize: GetFontSize(14),
                color: index === activeParagraph ? 'blue' : 'gray',
              }}
              className={` mt-[24px] ml-[36px] mr-[20px] font-poppins500 text-[#292929] `}>
              {eachParaagrapth}
            </Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewEnglishUI;
