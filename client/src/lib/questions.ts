export type OptionType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Option {
  type: OptionType;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const typeMapping: Record<OptionType, string> = {
  A: "Words of Affirmation (인정하는 말)",
  B: "Quality Time (함께하는 시간)",
  C: "Receiving Gifts (선물/흔적)",
  D: "Acts of Service (봉사/행동)",
  E: "Physical Touch (스킨십)",
};

export const typeDescriptions: Record<OptionType, string> = {
  A: "당신은 따뜻한 말 한마디, 격려, 칭찬, 그리고 감사를 표현하는 말에서 가장 큰 사랑을 느낍니다. 연인이 당신의 노력을 알아주고 말로 표현해줄 때, 당신은 깊은 안정감과 행복을 경험합니다.",
  B: "당신은 연인과 온전히 함께하는 시간에서 가장 큰 사랑을 느낍니다. TV를 끄고 서로의 눈을 바라보며 대화하거나, 산책을 하는 등 오직 둘만을 위해 집중하는 그 순간이 당신에게는 가장 소중합니다.",
  C: "당신은 선물이나 마음이 담긴 흔적을 통해 사랑을 확인합니다. 물건의 가격보다는 준비하는 동안 나를 생각했다는 정성, 그리고 그 마음이 형태(선물, 편지, 메모 등)로 남아있을 때 깊은 감동을 받습니다.",
  D: "당신은 말보다는 행동으로 보여주는 사랑을 신뢰합니다. 내가 힘들어하는 일을 대신 해주거나, 귀찮은 일을 묵묵히 처리해주는 연인의 배려 깊은 행동에서 당신은 진정한 사랑을 느낍니다.",
  E: "당신은 스킨십을 통해 정서적 안정을 얻습니다. 손을 잡거나, 포옹하고, 가볍게 닿는 접촉들은 당신에게 '나는 사랑받고 있다'는 가장 확실하고 직접적인 신호입니다.",
};

export const questions: Question[] = [
  {
    id: 1,
    text: "연인이 나를 챙긴다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "진심이 느껴지는 말로 나를 지지해줄 때" },
      { type: 'B', text: "다른 일보다 나와의 시간을 우선할 때" },
      { type: 'C', text: "나를 떠올렸다는 흔적이 형태로 남아 있을 때" },
      { type: 'D', text: "내가 해야 할 일을 대신 처리해줄 때" },
      { type: 'E', text: "말없이 다가와 안아줄 때" },
    ]
  },
  {
    id: 2,
    text: "바쁜 하루 끝에 가장 위로가 되는 것은?",
    options: [
      { type: 'A', text: "“오늘 정말 고생했어”라는 말" },
      { type: 'B', text: "아무것도 안 하고 함께 쉬는 시간" },
      { type: 'C', text: "그날의 마음이 남아 있는 메모나 기록" },
      { type: 'D', text: "집안일이나 귀찮은 일을 먼저 해준 행동" },
      { type: 'E', text: "포옹이나 스킨십" },
    ]
  },
  {
    id: 3,
    text: "연인이 나를 잘 안다고 느끼는 기준은?",
    options: [
      { type: 'A', text: "내가 듣고 싶은 말을 정확히 해줄 때" },
      { type: 'B', text: "내가 필요로 하는 시간을 알아줄 때" },
      { type: 'C', text: "내 취향을 기억했다는 흔적을 보여줄 때" },
      { type: 'D', text: "내 상황에 맞게 행동으로 도와줄 때" },
      { type: 'E', text: "말 없이도 가까이 있어줄 때" },
    ]
  },
  {
    id: 4,
    text: "다툰 뒤 관계가 풀렸다고 느끼는 계기는?",
    options: [
      { type: 'A', text: "감정을 인정하는 말이 오갈 때" },
      { type: 'B', text: "시간을 내서 충분히 대화했을 때" },
      { type: 'C', text: "관계를 회복하려는 마음이 남아 있을 때" },
      { type: 'D', text: "이후 행동이 실제로 달라졌을 때" },
      { type: 'E', text: "자연스럽게 스킨십이 돌아올 때" },
    ]
  },
  {
    id: 5,
    text: "연인이 나를 우선순위에 둔다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "말로 내 편을 들어줄 때" },
      { type: 'B', text: "일정 속에 나를 포함시킬 때" },
      { type: 'C', text: "일상 속에서 나를 떠올렸다는 증거가 있을 때" },
      { type: 'D', text: "내 부담을 덜어주는 선택을 할 때" },
      { type: 'E', text: "신체적으로 가까이할 때" },
    ]
  },
  {
    id: 6,
    text: "시간이 지나도 더 오래 기억에 남는 것은?",
    options: [
      { type: 'A', text: "나를 인정해주던 말" },
      { type: 'B', text: "방해 없이 함께했던 시간" },
      { type: 'C', text: "다시 볼 수 있는 마음의 흔적" },
      { type: 'D', text: "말없이 나를 위해 움직였던 행동" },
      { type: 'E', text: "따뜻한 스킨십" },
    ]
  },
  {
    id: 7,
    text: "연인이 변했다고 느끼게 만드는 신호는?",
    options: [
      { type: 'A', text: "표현이 줄어들었을 때" },
      { type: 'B', text: "함께하는 시간이 줄었을 때" },
      { type: 'C', text: "나를 떠올린 흔적이 사라졌을 때" },
      { type: 'D', text: "행동이 귀찮아졌을 때" },
      { type: 'E', text: "스킨십이 줄었을 때" },
    ]
  },
  {
    id: 8,
    text: "연인이 노력하고 있다고 느끼는 기준은?",
    options: [
      { type: 'A', text: "말투가 부드러워질 때" },
      { type: 'B', text: "시간을 내려고 할 때" },
      { type: 'C', text: "마음이 형태로 남아 쌓일 때" },
      { type: 'D', text: "행동이 먼저 바뀔 때" },
      { type: 'E', text: "신체적 친밀감이 회복될 때" },
    ]
  },
  {
    id: 9,
    text: "연인이 나를 존중한다고 느끼는 방식은?",
    options: [
      { type: 'A', text: "말로 나를 인정해줄 때" },
      { type: 'B', text: "내 시간을 배려해줄 때" },
      { type: 'C', text: "나를 기억하고 있었다는 증거를 보일 때" },
      { type: 'D', text: "내 일을 내 일처럼 처리해줄 때" },
      { type: 'E', text: "신체적 경계를 존중할 때" },
    ]
  },
  {
    id: 10,
    text: "장거리 연애에서 가장 중요한 것은?",
    options: [
      { type: 'A', text: "꾸준한 표현" },
      { type: 'B', text: "정해진 소통 시간" },
      { type: 'C', text: "떨어져 있어도 남아 있는 흔적" },
      { type: 'D', text: "실질적인 도움과 배려" },
      { type: 'E', text: "만났을 때의 스킨십" },
    ]
  },
  {
    id: 11,
    text: "연인이 바쁜데도 사랑이 느껴지는 순간은?",
    options: [
      { type: 'A', text: "짧아도 진심이 담긴 말" },
      { type: 'B', text: "잠깐이라도 시간을 내줄 때" },
      { type: 'C', text: "나를 떠올렸다는 걸 보여줄 때" },
      { type: 'D', text: "내 일을 대신 처리해줄 때" },
      { type: 'E', text: "잠깐의 포옹" },
    ]
  },
  {
    id: 12,
    text: "연인이 무심하다고 느껴지는 이유는?",
    options: [
      { type: 'A', text: "말이 없어서" },
      { type: 'B', text: "시간이 없어서" },
      { type: 'C', text: "나를 떠올린 흔적이 없어서" },
      { type: 'D', text: "행동이 없어서" },
      { type: 'E', text: "거리감이 느껴져서" },
    ]
  },
  {
    id: 13,
    text: "연인에게 가장 고마움을 느끼는 순간은?",
    options: [
      { type: 'A', text: "진심 어린 말" },
      { type: 'B', text: "함께해 준 시간" },
      { type: 'C', text: "마음이 남아 있는 표현" },
      { type: 'D', text: "번거로운 걸 대신해준 행동" },
      { type: 'E', text: "따뜻한 접촉" },
    ]
  },
  {
    id: 14,
    text: "연인이 나를 이해한다고 느끼는 기준은?",
    options: [
      { type: 'A', text: "감정을 말로 정리해줄 때" },
      { type: 'B', text: "내 이야기를 끝까지 들을 때" },
      { type: 'C', text: "내 말을 기억해두었다는 흔적" },
      { type: 'D', text: "상황에 맞는 행동" },
      { type: 'E', text: "말 없이도 곁에 있음" },
    ]
  },
  {
    id: 15,
    text: "연인과 가장 깊이 연결돼 있다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "진솔한 대화" },
      { type: 'B', text: "방해 없는 시간" },
      { type: 'C', text: "형태로 남아 있는 마음" },
      { type: 'D', text: "서로를 위해 움직일 때" },
      { type: 'E', text: "말 없는 친밀감" },
    ]
  },
  {
    id: 16,
    text: "연인이 나를 선택했다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "말로 확신을 줄 때" },
      { type: 'B', text: "시간을 나에게 쓸 때" },
      { type: 'C', text: "나를 기억했다는 증거를 보일 때" },
      { type: 'D', text: "내 일을 우선 처리해줄 때" },
      { type: 'E', text: "신체적으로 가까이할 때" },
    ]
  },
  {
    id: 17,
    text: "연애에서 안정감을 느끼게 하는 요소는?",
    options: [
      { type: 'A', text: "꾸준한 표현" },
      { type: 'B', text: "반복되는 시간" },
      { type: 'C', text: "쌓여가는 흔적" },
      { type: 'D', text: "일관된 행동" },
      { type: 'E', text: "지속적인 스킨십" },
    ]
  },
  {
    id: 18,
    text: "연인이 나를 가장 잘 안다고 느끼는 행동은?",
    options: [
      { type: 'A', text: "필요한 말을 정확히 할 때" },
      { type: 'B', text: "원하는 시간을 알아줄 때" },
      { type: 'C', text: "취향을 기억했다는 증거" },
      { type: 'D', text: "부탁하지 않아도 움직이는 행동" },
      { type: 'E', text: "자연스러운 접촉" },
    ]
  },
  {
    id: 19,
    text: "연인이 사과할 때 더 신뢰가 가는 쪽은?",
    options: [
      { type: 'A', text: "말로 책임을 인정할 때" },
      { type: 'B', text: "시간을 내서 대화할 때" },
      { type: 'C', text: "마음이 남아 있는 표현을 할 때" },
      { type: 'D', text: "같은 실수를 반복하지 않는 행동" },
      { type: 'E', text: "다가와 안아줄 때" },
    ]
  },
  {
    id: 20,
    text: "연인에게 가장 기대하는 태도는?",
    options: [
      { type: 'A', text: "표현의 성실함" },
      { type: 'B', text: "시간의 우선순위" },
      { type: 'C', text: "기억을 남기는 방식" },
      { type: 'D', text: "행동의 책임감" },
      { type: 'E', text: "정서적 친밀감" },
    ]
  },
  {
    id: 21,
    text: "연애에서 가장 크게 불안해지는 상황은?",
    options: [
      { type: 'A', text: "애정 표현이 사라질 때" },
      { type: 'B', text: "함께하는 시간이 줄 때" },
      { type: 'C', text: "관계의 흔적이 사라질 때" },
      { type: 'D', text: "행동이 끊길 때" },
      { type: 'E', text: "스킨십이 사라질 때" },
    ]
  },
  {
    id: 22,
    text: "연인이 나를 배려한다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "말로 공감해줄 때" },
      { type: 'B', text: "시간을 조정해줄 때" },
      { type: 'C', text: "나를 떠올렸다는 증거를 줄 때" },
      { type: 'D', text: "내 부담을 덜어줄 때" },
      { type: 'E', text: "옆에 붙어 있을 때" },
    ]
  },
  {
    id: 23,
    text: "연인이 나를 사랑한다고 믿게 되는 기준은?",
    options: [
      { type: 'A', text: "말의 진정성" },
      { type: 'B', text: "시간의 지속성" },
      { type: 'C', text: "기억의 누적" },
      { type: 'D', text: "행동의 반복" },
      { type: 'E', text: "친밀감의 유지" },
    ]
  },
  {
    id: 24,
    text: "연인이 힘들어 보일 때 내가 먼저 하는 행동은?",
    options: [
      { type: 'A', text: "말을 건다" },
      { type: 'B', text: "시간을 만든다" },
      { type: 'C', text: "마음을 남길 무언가를 한다" },
      { type: 'D', text: "실질적으로 돕는다" },
      { type: 'E', text: "안아준다" },
    ]
  },
  {
    id: 25,
    text: "연인이 내 마음을 몰라준다고 느끼는 이유는?",
    options: [
      { type: 'A', text: "말을 안 해줘서" },
      { type: 'B', text: "시간을 안 써줘서" },
      { type: 'C', text: "나를 기억한 흔적이 없어서" },
      { type: 'D', text: "행동이 없어서" },
      { type: 'E', text: "거리감이 있어서" },
    ]
  },
  {
    id: 26,
    text: "연인 관계에서 절대 포기 못 하는 것은?",
    options: [
      { type: 'A', text: "표현" },
      { type: 'B', text: "시간" },
      { type: 'C', text: "흔적" },
      { type: 'D', text: "행동" },
      { type: 'E', text: "스킨십" },
    ]
  },
  {
    id: 27,
    text: "연인이 노력 중이라고 느끼는 증거는?",
    options: [
      { type: 'A', text: "말투 변화" },
      { type: 'B', text: "일정 조정" },
      { type: 'C', text: "형태로 남는 마음" },
      { type: 'D', text: "눈에 보이는 행동 변화" },
      { type: 'E', text: "신체적 친밀감" },
    ]
  },
  {
    id: 28,
    text: "연인이 무언가를 해줬을 때 더 크게 느껴지는 것은?",
    options: [
      { type: 'A', text: "말의 진심" },
      { type: 'B', text: "시간의 선택" },
      { type: 'C', text: "다시 볼 수 있는 것" },
      { type: 'D', text: "지금 편해지는 것" },
      { type: 'E', text: "접촉의 온기" },
    ]
  },
  {
    id: 29,
    text: "연인이 나를 생각하고 있다고 느끼는 순간은?",
    options: [
      { type: 'A', text: "말이 먼저 나올 때" },
      { type: 'B', text: "시간이 먼저 날 때" },
      { type: 'C', text: "흔적이 남아 있을 때" },
      { type: 'D', text: "행동이 먼저 나올 때" },
      { type: 'E', text: "다가올 때" },
    ]
  },
  {
    id: 30,
    text: "연애에서 “이건 진짜다”라고 느끼는 순간은?",
    options: [
      { type: 'A', text: "말과 마음이 일치할 때" },
      { type: 'B', text: "시간이 계속 확보될 때" },
      { type: 'C', text: "기억이 형태로 남아 있을 때" },
      { type: 'D', text: "행동으로 증명될 때" },
      { type: 'E', text: "가까움이 유지될 때" },
    ]
  }
];

// Utility to shuffle options
export function shuffleOptions(options: Option[]): Option[] {
  return [...options].sort(() => Math.random() - 0.5);
}
