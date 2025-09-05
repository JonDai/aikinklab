/**
 * Comprehensive Kink Personality Results System
 * Based on psychological research and industry best practices
 * SEO-optimized personality types with detailed descriptions
 */

export interface KinkPersonalityType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detailedDescription: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  compatibility: string[];
  explorationSuggestions: string[];
  safetyConcerns: string[];
  communicationTips: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  prevalence: number; // percentage in population
  iconType: 'dominant' | 'submissive' | 'switch' | 'vanilla' | 'kink-specific';
}

export interface TestResults {
  personalityType: KinkPersonalityType;
  scores: PersonalityScores;
  secondaryTypes: KinkPersonalityType[];
  confidenceLevel: number;
  detailedAnalysis: DetailedAnalysis;
  recommendations: Recommendations;
  nextSteps: string[];
}

export interface PersonalityScores {
  dominance: number;
  submission: number;
  sadism: number;
  masochism: number;
  switch: number;
  vanilla: number;
  rope: number;
  degradation: number;
  praise: number;
  control: number;
  service: number;
  bratty: number;
  caregiver: number;
  pet: number;
  exhibitionist: number;
  voyeur: number;
}

export interface DetailedAnalysis {
  primaryTraits: TraitAnalysis[];
  powerDynamicsAnalysis: string;
  physicalPreferences: string;
  psychologicalAspects: string;
  communicationStyle: string;
  experienceLevel: string;
  relationshipStyle: string;
}

export interface TraitAnalysis {
  trait: string;
  score: number;
  description: string;
  implications: string[];
}

export interface Recommendations {
  educational: string[];
  practical: string[];
  safety: string[];
  communication: string[];
  exploration: string[];
}

// Comprehensive personality types based on research and community feedback
export const kinkPersonalityTypes: KinkPersonalityType[] = [
  {
    id: 'caring-dominant',
    name: 'The Caring Dominant',
    shortName: 'Caring Dom/me',
    description: 'A nurturing leader who takes charge with compassion and genuine care for their partner\'s wellbeing and growth.',
    detailedDescription: 'You are a natural leader who finds deep satisfaction in guiding and caring for others. Your dominance comes from a place of genuine love and protection rather than mere control. You take great responsibility for your partner\'s physical and emotional wellbeing, and you derive pleasure from seeing them flourish under your guidance. Your approach to dominance is thoughtful, patient, and deeply connected to your partner\'s needs and desires.',
    traits: [
      'Nurturing and protective',
      'Patient and understanding',
      'Strong sense of responsibility',
      'Excellent at reading partner needs',
      'Values consent and communication',
      'Enjoys mentoring and teaching',
      'Emotionally intelligent',
      'Service-oriented leadership'
    ],
    strengths: [
      'Creates safe, trusting environments',
      'Excellent at aftercare and emotional support',
      'Natural teacher and mentor',
      'Strong communication skills',
      'Builds deep, lasting connections',
      'Highly attuned to partner needs',
      'Balances power with compassion',
      'Promotes partner growth and exploration'
    ],
    challenges: [
      'May struggle with being too protective',
      'Can be overly responsible for partner\'s emotions',
      'Might neglect own needs while caring for others',
      'May have difficulty being selfish or demanding',
      'Can burn out from constant caretaking',
      'Might struggle with partners who need independence',
      'May avoid necessary difficult conversations',
      'Can be too forgiving of boundary violations'
    ],
    compatibility: [
      'Service Submissive - Perfect match for mutual care',
      'Little/Middle - Excellent caregiver dynamic',
      'Bratty Submissive - Patience helps with bratty behavior',
      'Pet Play Enthusiast - Natural guardian/pet dynamic',
      'Masochistic Submissive - Caring approach to intense play',
      'Vanilla-Curious Explorer - Gentle introduction to kink'
    ],
    explorationSuggestions: [
      'Practice different types of aftercare',
      'Explore teaching and mentoring scenarios',
      'Try caregiver/little dynamics',
      'Experiment with reward-based training',
      'Explore sensual dominance techniques',
      'Practice mindful BDSM approaches',
      'Try rope bondage as a caring art form',
      'Explore tantric and spiritual BDSM'
    ],
    safetyConcerns: [
      'Monitor for caregiver burnout',
      'Ensure your own needs are met',
      'Set boundaries around emotional labor',
      'Don\'t neglect your own self-care',
      'Be aware of codependent patterns',
      'Maintain identity outside of dominance',
      'Practice saying no when overwhelmed',
      'Seek support from other dominants'
    ],
    communicationTips: [
      'Regular check-ins about emotional needs',
      'Express your own needs clearly',
      'Practice asking for support when needed',
      'Use positive reinforcement effectively',
      'Learn to give constructive feedback',
      'Develop skills in difficult conversations',
      'Practice setting loving boundaries',
      'Learn to receive care from others'
    ],
    seoTitle: 'Caring Dominant Personality Type | BDSM Leadership Style',
    seoDescription: 'Discover the Caring Dominant personality - nurturing leadership in BDSM relationships. Learn traits, compatibility, and exploration tips for this dominant style.',
    seoKeywords: [
      'caring dominant',
      'nurturing dominant',
      'bdsm leadership',
      'dominant personality type',
      'protective dominant',
      'bdsm caregiver',
      'gentle dominance',
      'service oriented dominant'
    ],
    prevalence: 18.5,
    iconType: 'dominant'
  },
  {
    id: 'service-submissive',
    name: 'The Service Submissive',
    shortName: 'Service Sub',
    description: 'A dedicated submissive who finds deep fulfillment in serving others and making their dominant\'s life better through acts of service.',
    detailedDescription: 'You are motivated by the joy of serving others and find deep satisfaction in acts of service, both sexual and non-sexual. Your submission is expressed through anticipating needs, performing tasks, and creating comfort for your dominant. You take pride in being useful, reliable, and indispensable. Your greatest pleasure comes from knowing you\'ve made someone else\'s life better, and you often express love and devotion through actions rather than words.',
    traits: [
      'Deeply service-oriented',
      'Highly observant of needs',
      'Pride in being useful',
      'Detail-oriented and thorough',
      'Loyal and devoted',
      'Proactive in anticipating needs',
      'Values routine and structure',
      'Finds joy in others\' happiness'
    ],
    strengths: [
      'Incredibly reliable and consistent',
      'Excellent at anticipating needs',
      'Natural at creating comfortable environments',
      'Strong work ethic and dedication',
      'Builds deep, lasting bonds through service',
      'Highly skilled at reading people',
      'Takes initiative in helpful ways',
      'Finds fulfillment in supporting others'
    ],
    challenges: [
      'May neglect own needs for others',
      'Can struggle with receiving rather than giving',
      'Might have difficulty expressing personal desires',
      'Can become overwhelmed by perfectionism',
      'May struggle with downtime or relaxation',
      'Might have difficulty saying no to requests',
      'Can develop martyr complex if unappreciated',
      'May struggle with partners who don\'t need service'
    ],
    compatibility: [
      'Caring Dominant - Perfect match for mutual care',
      'Authoritarian Dominant - Clear structure and expectations',
      'Sadistic Dominant - Service through enduring for them',
      'Owner/Master - Complete service-based relationship',
      'Primal Dominant - Service in more primitive ways',
      'Switch (Dominant leaning) - Alternating care roles'
    ],
    explorationSuggestions: [
      'Explore different types of service (domestic, sexual, personal)',
      'Try formal service protocols and rituals',
      'Practice anticipatory service skills',
      'Explore service in public settings (discretely)',
      'Try combining service with other kinks',
      'Practice serving multiple people (if interested)',
      'Explore historical service dynamics',
      'Try service competitions or challenges'
    ],
    safetyConcerns: [
      'Monitor for burnout and exhaustion',
      'Ensure your needs are being met',
      'Set limits on service expectations',
      'Don\'t lose your identity in service',
      'Watch for exploitation or abuse',
      'Maintain interests outside of service',
      'Practice receiving care from others',
      'Set boundaries around free labor'
    ],
    communicationTips: [
      'Learn to express your own needs clearly',
      'Practice asking for recognition and appreciation',
      'Communicate when service becomes overwhelming',
      'Express what types of service you most enjoy',
      'Learn to negotiate service agreements',
      'Practice saying no to unreasonable requests',
      'Communicate your limits around service',
      'Ask for feedback on your service quality'
    ],
    seoTitle: 'Service Submissive Personality Type | BDSM Service Orientation',
    seoDescription: 'Learn about the Service Submissive personality type in BDSM. Discover traits, compatibility, and guidance for service-oriented submission.',
    seoKeywords: [
      'service submissive',
      'service oriented submission',
      'bdsm service',
      'submissive personality type',
      'domestic service',
      'servant submissive',
      'service kink',
      'helpful submissive'
    ],
    prevalence: 16.2,
    iconType: 'submissive'
  },
  {
    id: 'bratty-submissive',
    name: 'The Bratty Submissive',
    shortName: 'Brat',
    description: 'A playful submissive who enjoys testing boundaries and provoking reactions while maintaining underlying respect and submission.',
    detailedDescription: 'You are a spirited submissive who enjoys playful rebellion and testing boundaries as a form of engagement with your dominant. Your "brattiness" isn\'t true disobedience but rather a way of seeking attention, creating playful tension, and inviting your dominant to assert their authority. You enjoy the thrill of being "caught" and corrected, and you often use sass, teasing, and mild defiance as love languages. Your submission is real, but you prefer it earned rather than freely given.',
    traits: [
      'Playfully defiant and teasing',
      'Seeks attention through misbehavior',
      'Enjoys testing boundaries safely',
      'Witty and verbally sparring',
      'Values playful interactions',
      'Needs engaging dominants',
      'Expresses affection through teasing',
      'Enjoys earning punishments'
    ],
    strengths: [
      'Brings energy and excitement to relationships',
      'Excellent at communication through play',
      'Keeps relationships dynamic and engaging',
      'Natural at breaking tension with humor',
      'Great at encouraging dominant growth',
      'Highly expressive and authentic',
      'Good at advocating for needs indirectly',
      'Brings out protective instincts in others'
    ],
    challenges: [
      'Can frustrate patient or gentle dominants',
      'May cross lines between play and disrespect',
      'Might struggle with serious moments',
      'Can be exhausting for some partners',
      'May have difficulty with direct communication',
      'Might escalate beyond comfortable limits',
      'Can struggle with traditional submission',
      'May be misunderstood as truly disobedient'
    ],
    compatibility: [
      'Strict/Stern Dominant - Enjoys the challenge of taming',
      'Sadistic Dominant - Can handle and enjoy punishment',
      'Primal Dominant - Matches energy and intensity',
      'Daddy/Mommy Dom - Patient but firm guidance',
      'Owner/Master - Clear rules to push against',
      'Switch (Dominant leaning) - Can brat back occasionally'
    ],
    explorationSuggestions: [
      'Develop clear bratting vs. disrespect boundaries',
      'Try funishment vs. real punishment dynamics',
      'Explore brat taming techniques',
      'Practice different types of bratty behavior',
      'Try competitive or gaming dynamics',
      'Explore public bratting (appropriate settings)',
      'Try bratty service or helpful disobedience',
      'Explore age play bratting if interested'
    ],
    safetyConcerns: [
      'Establish clear limits on bratty behavior',
      'Don\'t let bratting mask real issues',
      'Ensure punishments remain safe and consensual',
      'Watch for escalation beyond safe limits',
      'Don\'t brat when partner is genuinely stressed',
      'Maintain respect even while being bratty',
      'Have serious communication outside of scenes',
      'Don\'t use bratting to avoid difficult conversations'
    ],
    communicationTips: [
      'Learn when to be serious vs. playful',
      'Develop direct communication skills',
      'Express appreciation for patience and tolerance',
      'Communicate what types of responses you enjoy',
      'Practice apologizing when you cross lines',
      'Learn to express needs without bratting',
      'Communicate your limits around punishment',
      'Practice giving genuine compliments and appreciation'
    ],
    seoTitle: 'Bratty Submissive Personality | BDSM Brat Behavior Guide',
    seoDescription: 'Understanding the Bratty Submissive personality in BDSM. Learn about brat behavior, compatibility, and healthy bratting dynamics.',
    seoKeywords: [
      'bratty submissive',
      'bdsm brat',
      'bratty behavior',
      'brat taming',
      'playful submission',
      'bratty personality',
      'submissive brat',
      'brat punishment'
    ],
    prevalence: 14.8,
    iconType: 'submissive'
  },
  {
    id: 'versatile-switch',
    name: 'The Versatile Switch',
    shortName: 'Switch',
    description: 'A flexible individual who enjoys both dominant and submissive roles depending on mood, partner, and situation.',
    detailedDescription: 'You are naturally versatile and enjoy experiencing both sides of power exchange. Your ability to switch between dominant and submissive roles makes you adaptable and empathetic to different perspectives. You might prefer one role with certain partners or in certain situations, but you genuinely enjoy and are fulfilled by both. Your switching ability often makes you an excellent communicator and understanding partner, as you\'ve experienced both sides of various dynamics.',
    traits: [
      'Naturally versatile and adaptable',
      'Empathetic to both sides of power exchange',
      'Mood and situation dependent preferences',
      'Excellent at reading partner needs',
      'Values balance and variety',
      'Strong communication skills',
      'Open-minded and experimental',
      'Comfortable with role flexibility'
    ],
    strengths: [
      'Brings unique perspective from both roles',
      'Highly adaptable to partner needs',
      'Excellent at understanding different viewpoints',
      'Natural mediator in community discussions',
      'Can help partners explore their switches',
      'Brings variety and excitement to relationships',
      'Usually very good communicators',
      'Comfortable with non-traditional dynamics'
    ],
    challenges: [
      'May struggle with partners who want consistency',
      'Can be indecisive about what they want',
      'Might not get deep fulfillment from either role',
      'Can confuse partners unsure how to approach',
      'May struggle in communities focused on single roles',
      'Might feel pressure to choose one side',
      'Can be exhausting trying to meet all needs',
      'May struggle with identity confusion'
    ],
    compatibility: [
      'Other Switches - Perfect understanding and flexibility',
      'Versatile Dominants - Appreciate switching energy',
      'Submissives interested in topping - Growth partnership',
      'Dominants interested in bottoming - Exploration partnership',
      'Multiple partners - Different roles with different people',
      'Anyone open to role experimentation'
    ],
    explorationSuggestions: [
      'Try alternating roles with regular partners',
      'Explore different aspects of each role',
      'Practice switching mid-scene if comfortable',
      'Try service switching (serving other switches)',
      'Explore switches in different kink areas',
      'Try group dynamics with multiple switches',
      'Explore switching with different genders',
      'Practice teaching others about switching'
    ],
    safetyConcerns: [
      'Don\'t let others pressure you to choose one role',
      'Maintain boundaries in each role',
      'Don\'t ignore your needs to please others',
      'Be clear about current headspace/role',
      'Don\'t switch to avoid dealing with issues',
      'Maintain safety practices in all roles',
      'Don\'t let versatility be used to exploit you',
      'Practice self-care for both sides of yourself'
    ],
    communicationTips: [
      'Be clear about current role preference',
      'Communicate switching triggers and preferences',
      'Express needs for both sides of your nature',
      'Help partners understand your versatility',
      'Negotiate different dynamics for different roles',
      'Communicate when you need to switch roles',
      'Express appreciation for partner flexibility',
      'Discuss long-term role distribution in relationships'
    ],
    seoTitle: 'Versatile Switch Personality | BDSM Role Flexibility Guide',
    seoDescription: 'Explore the Versatile Switch personality in BDSM. Learn about switching between dominant and submissive roles, compatibility, and dynamics.',
    seoKeywords: [
      'bdsm switch',
      'versatile switch',
      'switching roles',
      'dominant submissive switch',
      'flexible bdsm',
      'switch personality',
      'role switching',
      'bdsm versatility'
    ],
    prevalence: 22.1,
    iconType: 'switch'
  },
  {
    id: 'curious-explorer',
    name: 'The Curious Explorer',
    shortName: 'Explorer',
    description: 'An open-minded individual who is interested in exploring various aspects of kink and BDSM to discover their preferences.',
    detailedDescription: 'You approach kink and BDSM with genuine curiosity and openness to experience. You may not have settled on specific roles or interests yet, but you\'re eager to learn and try different things in a safe, consensual environment. Your journey is about self-discovery and understanding what resonates with you personally. You value education, communication, and gradual exploration as you build your understanding of your own desires and boundaries.',
    traits: [
      'Open-minded and curious',
      'Eager to learn and experience',
      'Values safety and education',
      'Asks lots of questions',
      'Approaches kink thoughtfully',
      'Enjoys experimentation',
      'Values gradual progression',
      'Seeks guidance from experienced people'
    ],
    strengths: [
      'Brings fresh perspective without preconceptions',
      'Usually very safety-conscious',
      'Excellent at communication and consent',
      'Enthusiastic about learning',
      'Open to feedback and guidance',
      'Not limited by previous assumptions',
      'Values education and preparation',
      'Great at building communities'
    ],
    challenges: [
      'May feel overwhelmed by all the options',
      'Can be taken advantage of by predatory people',
      'Might rush into things without proper preparation',
      'May struggle with imposter syndrome',
      'Can be indecisive about what to try',
      'Might compare themselves to experienced people',
      'May feel pressure to find their "true" role quickly',
      'Can be targeted by people wanting to "train" them'
    ],
    compatibility: [
      'Caring Dominants - Patient guidance and education',
      'Experienced Switches - Can show multiple perspectives',
      'Other Explorers - Journey together safely',
      'Mentoring-oriented people - Value teaching and guidance',
      'Patient Service Tops - Focus on explorer\'s experience',
      'Educational community members - Safety-focused'
    ],
    explorationSuggestions: [
      'Start with educational workshops and classes',
      'Try low-risk activities first',
      'Find mentors in the community',
      'Keep a journal of experiences and reactions',
      'Try different types of play with trusted partners',
      'Attend community events and munches',
      'Read extensively about safety and techniques',
      'Practice communication and negotiation skills'
    ],
    safetyConcerns: [
      'Be very careful about partner selection',
      'Don\'t rush into intense activities',
      'Always negotiate thoroughly before play',
      'Don\'t let others push your boundaries',
      'Trust your instincts about people and situations',
      'Learn about red flags and predatory behavior',
      'Get multiple perspectives on safety practices',
      'Don\'t feel pressure to try everything'
    ],
    communicationTips: [
      'Ask lots of questions - it\'s normal and good',
      'Express your curiosity and desire to learn',
      'Communicate your limits clearly',
      'Don\'t be afraid to say you\'re new',
      'Express appreciation for patient teaching',
      'Communicate when something doesn\'t feel right',
      'Ask for explanations of terminology and practices',
      'Express your goals and interests clearly'
    ],
    seoTitle: 'Curious Explorer Personality | BDSM Beginner Guide',
    seoDescription: 'Perfect guide for BDSM beginners and curious explorers. Learn safe exploration, finding mentors, and discovering your kink interests.',
    seoKeywords: [
      'bdsm beginner',
      'curious about kink',
      'exploring bdsm',
      'kink exploration',
      'bdsm newcomer',
      'learning about bdsm',
      'kink beginner guide',
      'bdsm exploration'
    ],
    prevalence: 19.3,
    iconType: 'vanilla'
  },
  // Additional personality types would be added here for a complete system...
];

// Scoring algorithm to determine personality type
export function calculateKinkPersonality(responses: Record<string, any>): TestResults {
  // This would be implemented with the actual scoring algorithm
  // based on the responses to all 80 questions
  
  // Placeholder implementation
  const scores: PersonalityScores = {
    dominance: 0,
    submission: 0,
    sadism: 0,
    masochism: 0,
    switch: 0,
    vanilla: 0,
    rope: 0,
    degradation: 0,
    praise: 0,
    control: 0,
    service: 0,
    bratty: 0,
    caregiver: 0,
    pet: 0,
    exhibitionist: 0,
    voyeur: 0
  };

  // Calculate scores based on responses
  // This would involve complex scoring algorithms

  // Determine primary personality type
  const primaryType = kinkPersonalityTypes[0]; // Placeholder

  const results: TestResults = {
    personalityType: primaryType,
    scores,
    secondaryTypes: [],
    confidenceLevel: 0.85,
    detailedAnalysis: {
      primaryTraits: [],
      powerDynamicsAnalysis: '',
      physicalPreferences: '',
      psychologicalAspects: '',
      communicationStyle: '',
      experienceLevel: '',
      relationshipStyle: ''
    },
    recommendations: {
      educational: [],
      practical: [],
      safety: [],
      communication: [],
      exploration: []
    },
    nextSteps: []
  };

  return results;
}

export const personalityTypesByCategory = {
  dominant: kinkPersonalityTypes.filter(type => type.iconType === 'dominant'),
  submissive: kinkPersonalityTypes.filter(type => type.iconType === 'submissive'),
  switch: kinkPersonalityTypes.filter(type => type.iconType === 'switch'),
  vanilla: kinkPersonalityTypes.filter(type => type.iconType === 'vanilla'),
  'kink-specific': kinkPersonalityTypes.filter(type => type.iconType === 'kink-specific')
};