export const blocks = [
    {
      name: "short-text",
      id: "kd12edg",
      attributes: {
        required: true,
        label: "Let's start with your name hello"
      }
    },
    {
      name: "number",
      id: "wer3qdkdb",
      attributes: {
        required: true,
        label: "Great {{field:kdsfkdg}}, can you type your age?"
      }
    },
    {
      name: "long-text",
      id: "m35612edg",
      attributes: {
        required: true,
        label: "Type a brief about yourself!"
      }
    },
    {
      name: "date",
      id: "a213rsew",
      attributes: {
        required: true,
        label: "Please type your birth of date!"
      }
    },
    {
      name: "email",
      id: "iqfrqwr13r",
      attributes: {
        required: true,
        label: "Thanks {{field:kdsfkdg}}, please insert your email!"
      }
    },
    {
      name: "dropdown",
      id: "nb913rqw",
      attributes: {
        required: true,
        label: "Please select one choice",
        choices: [
          {
            label: "Choice 1",
            value: "choice-1"
          },
          {
            label: "Choice 2",
            value: "choice-2"
          },
          {
            label: "Choice 2",
            value: "choice-3"
          }
        ]
      }
    },
    {
      name: "multiple-choice",
      id: "gqr1294c",
      attributes: {
        required: true,
        multiple: true,
        verticalAlign: false,
        label: "Which subjects do you love the most?",
        choices: [
          {
            label: "Physics",
            value: "physics"
          },
          {
            label: "Math",
            value: "math"
          },
          {
            label: "English",
            value: "english"
          },
          {
            label: "Biology",
            value: "biology"
          }
        ]
      }
    },
    {
      name: "statement",
      id: "g91imf1023",
      attributes: {
        label: "You are doing great so far!",
        buttonText: "Continue",
        quotationMarks: true
      }
    },
    {
      name: "website",
      id: "bv91em9123",
      attributes: {
        required: true,
        multiple: true,
        label: "Please insert your website url!"
      }
    }
  ]

export const newContentBlockObject = {
    blockKey: 0,
    name: "short-text",
    id: "kd12edg",
    attributes: {
      required: false,
      label: 'Untitled text'
    }
}

export const choicesBlock =  {
  name: "multiple-choice",
  id: "kd12edg",
  attributes: {
    required: true,
    multiple: false,
    verticalAlign: false,
    label: "Untitled text",
    choices: [
      {
        id: 0,
        label: "text1",
        value: "text1"
      },
      {
        id: 1,
        label: "text2",
        value: "text2"
      },
    ]
  }
}

export const choiceItemBlock = {
  id: 0,
  label: "text1",
  value: "text1"
}

export const REDIRECTION_ROUTES = {
  HOME: '/',
  VOTING: 'voting',
  FORM: 'form',
  FORMS: 'forms',
  EDIT_FORM: 'form/edit',
  VIEW_FORM: 'form/:id',
  RESPONSES: 'responses/:id',
  MARKETPLACE: 'marketplace',
}

export const CHAINS = {
  BASE: 'BASE',
  KIICHAIN: 'KIICHAIN',
  SUI: 'SUI',
  SOLANA: 'SOLANA'
}

export const EVM_CHAIN_RPC = {
  BASE : 'https://sepolia.base.org',
  KIICHAIN : 'https://a.sentry.testnet.kiivalidator.com:8645/'
}

export const KII_CHAIN_PARAMS = {
  chainId: '0x75bc371', // 123454321 in hex
  chainName: 'KiiChain',
  rpcUrls: [EVM_CHAIN_RPC.KIICHAIN],
  nativeCurrency: {
    name: 'Kiichain Testnet',
    symbol: 'kii',
    decimals: 18,
  },
  blockExplorerUrls: ['https://kiichainexplorer.com/'],
};

//ref chainid to hex - https://chainlist.org/?search=base&testnets=true
export const BASE_CHAIN_PARAMS = {
  chainId: '0x14a34', // 84532 in hex
  chainName: 'base-sepolia',
  rpcUrls: [EVM_CHAIN_RPC.BASE],
  nativeCurrency: {
    name: 'Base Sepolia ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://sepolia-explorer.base.org'],
};