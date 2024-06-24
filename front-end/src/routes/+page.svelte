<script>
    import Conversation from "../lib/Learns/conversation.svelte";
    let chapter1 = [
        {
            type: "vocab",
            data: [
                { text: "hello", img: "", status: false },
                { text: "goodbye", img: "", status: false },
                { text: "thank you", img: "", status: false },
                { text: "I", img: "", status: false },
                { text: "You", img: "", status: false },
                { text: "boy", img: "", status: false },
                { text: "girl", img: "", status: false },
                { text: "apple", img: "", status: false },
                { text: "eat", img: "", status: false },
            ],
        },
        {
            type: "sentence",
            data: [
                { text: "Hello pussy.", img: "", status: false },
                { text: "How are you?", img: "", status: false },
                { text: "very well, thank you.", img: "", status: false },
                { text: "a boy eats an apple", img: "", status: false },
                { text: "she is a girl.", img: "", status: false },
                { text: "I'm a boy and she is a girl", img: "", status: false },
                { text: "she is a girl.", img: "", status: false },
            ],
        },
        {
            type: "conversation",
            speaker_img: {
                a: "https://cdn-icons-png.flaticon.com/256/9559/9559035.png",
                b: "https://cdn-icons-png.flaticon.com/256/9725/9725273.png",
            },
            res: [
                {
                    text_en: "Hello, Jack.",
                    text_th: "สวัสดีแจ็ค",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "Hello, Harry",
                    text_th: "สวัสดีแฮรี",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "How are you?",
                    text_th: "คุณเป็นอย่างบ้าง",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "very well, thank you. and you?",
                    text_th: "สบายดี แล้วคุณล่ะ",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "I'm good, thank you.",
                    text_th: "ฉันสบาย ขอบคุณ",
                    speaker: "a",
                    status: false,
                },
                {
                    text_en: "I have to go now. goodbye!",
                    text_th: "ฉันต้องไปแล้ว ลาก่อน",
                    speaker: "b",
                    status: false,
                },
                {
                    text_en: "goodbye!",
                    text_th: "ลาก่อน",
                    speaker: "a",
                    status: false,
                },
            ],
        },
    ];
</script>

<Conversation data={chapter1[2]} />