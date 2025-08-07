export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content?: string;
  categories?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Bayesian Clue Solver: My Journey into Probabilistic Game AI",
    date: "August 6, 2025",
    excerpt: "A detailed exploration of building an AI system that uses Bayesian inference to solve the classic board game Clue. From initial frustration during family game night to a sophisticated probabilistic reasoning engine.",
    slug: "bayesian-clue-solver",
    categories: ["AI", "Game Theory", "Python", "Bayesian Inference", "Machine Learning"],
    content: `
      <h2>Introduction: The Spark of Inspiration</h2>
      <p>My journey into building a Clue Solver began with a simple frustration during a family game night. As I sat around the table playing Clue (or Cluedo, as it's known in some countries), I found myself struggling to keep track of all the information revealed through suggestions and responses. Who had shown what card? Which cards were definitely not in the envelope? What were the most likely combinations based on the evidence so far?</p>
      
      <p>This frustration sparked an idea: what if I could build a system that could track all this information in real-time and use probabilistic reasoning to help players make optimal suggestions? The challenge was particularly appealing because it combined my interest in game theory, probability, and artificial intelligence. I wanted to create something that wasn't just a simple card tracker, but a sophisticated AI assistant that could reason about uncertainty and provide strategic insights.</p>
      
      <p>The project became more than just a tool for winning games—it became an exploration of how Bayesian inference could be applied to a real-world problem with clear, measurable outcomes. Every game of Clue is essentially a puzzle where players must infer hidden information from partial observations, making it a perfect domain for probabilistic reasoning.</p>

      <h2>Technology Choices: Building on Solid Foundations</h2>
      <p>When I started planning the project, I knew I needed to choose technologies that would allow me to focus on the core algorithmic challenges rather than getting bogged down in implementation details. After considering several options, I settled on a Python-based stack that would give me the mathematical tools I needed while keeping the development process smooth.</p>
      
      <p><strong>Python</strong> was my natural choice for the core logic. Its rich ecosystem of scientific computing libraries, particularly NumPy and Pandas, would be essential for handling the probability calculations and state management. Python's type hints would help me maintain clean, readable code as the project grew in complexity.</p>
      
      <p>For the user interface, I chose <strong>Streamlit</strong> over alternatives like Flask or Django. This decision was driven by my desire to create an interactive, real-time experience without spending weeks on frontend development. Streamlit's declarative approach and built-in components for data visualization would allow me to focus on the core functionality while still delivering a polished user experience.</p>
      
      <p>The mathematical foundation would rely on <strong>NumPy</strong> for efficient array operations and probability calculations, and <strong>Pandas</strong> for structured data management. These libraries would handle the heavy lifting of matrix operations and probability distributions that would be central to the Bayesian inference engine.</p>

      <h2>Implementation Journey: From Simple Tracker to Sophisticated AI</h2>
      
      <h3>Stage 1: Basic Game State Management</h3>
      <p>My first step was to create a solid foundation for tracking the game state. I started with <code>clue_constants.py</code> to define the game's core elements—the six suspects, six weapons, and nine rooms that make up the Clue universe. This simple file would become the backbone of the entire system.</p>
      
      <p>Next, I built the <code>ClueGameManager</code> class, which would serve as the central orchestrator. This class needed to handle:</p>
      <ul>
        <li>Player management and card distribution</li>
        <li>Suggestion tracking with timestamps</li>
        <li>Integration between different inference engines</li>
      </ul>
      
      <p>The initial implementation was straightforward but revealed my first challenge: how to handle the circular nature of player turns and the complex rules around who can refute suggestions. I solved this by creating a <code>Suggestion</code> dataclass that captured all the relevant information about each game event.</p>

      <h3>Stage 2: The Probability Engine</h3>
      <p>The heart of the system would be the <code>EnvelopeProbabilityEngine</code>. This is where the Bayesian magic would happen. I designed it to maintain separate probability distributions for suspects, weapons, and rooms, updating them based on game events.</p>
      
      <p>The core algorithm was inspired by Bayesian inference principles. For each card, I needed to estimate:</p>
      <p><code>P(Card ∈ Envelope | History) ∝ P(Card) × P(Observed Evidence | Card ∈ Envelope)</code></p>
      
      <p>The challenge was implementing the update rules for different types of evidence. When a card is shown, it's definitely not in the envelope. When no one can refute a suggestion, those cards must be in the envelope. When someone shows an unknown card, it decreases the probability of the other suggested cards.</p>
      
      <p>I implemented these rules with carefully chosen constants:</p>
      <ul>
        <li><code>DECREASE_FACTOR = 0.5</code> for when cards are shown</li>
        <li><code>INCREASE_FACTOR = 2.0</code> for when no one can refute</li>
      </ul>
      
      <p>The normalization step was crucial—after each update, I had to ensure that probabilities within each category (suspects, weapons, rooms) summed to 1.0.</p>

      <h3>Stage 3: Player Card Tracking</h3>
      <p>While the envelope probability engine focused on the solution, I realized I also needed to track which cards each player likely held. This led to the <code>PlayerCardTracker</code> class, which maintained a probability matrix for each player-card combination.</p>
      
      <p>This component introduced new challenges around constraint satisfaction. Each player must have exactly 3 cards, and each card can only be held by one player (or be in the envelope). I implemented a normalization algorithm that respected these constraints while updating probabilities based on game events.</p>
      
      <p>The most complex part was handling the case where someone shows an unknown card. I needed to:</p>
      <ol>
        <li>Mark that the responding player must have at least one of the suggested cards</li>
        <li>Eliminate the possibility that players who passed could have any of the suggested cards</li>
        <li>Update probabilities accordingly while maintaining the constraint that each player has exactly 3 cards</li>
      </ol>

      <h3>Stage 4: Rule-Based Inference</h3>
      <p>To make the system even more intelligent, I added the <code>RuleBasedInferenceEngine</code>. This component applied heuristic rules based on player behavior patterns. For example, if a player frequently refutes suggestions containing certain cards, they're more likely to have those cards.</p>
      
      <p>I implemented this using a refutation history tracker that counted how often each player refuted each card. The probability increase grew exponentially with the number of refutations, using a <code>growth_factor</code> of 1.5.</p>

      <h3>Stage 5: User Interface and Integration</h3>
      <p>With the core logic in place, I turned to building the user interface using Streamlit. I wanted to create an experience that felt both sophisticated and intuitive. The interface needed to:</p>
      <ul>
        <li>Display real-time probability updates</li>
        <li>Allow easy input of game events</li>
        <li>Provide strategic suggestions</li>
        <li>Show the current state of the game</li>
      </ul>
      
      <p>I added custom CSS styling to create a dark, atmospheric theme that matched the mystery theme of Clue. The background image and overlay effects gave it a polished, professional feel.</p>

      <h2>Key Algorithms and Design Decisions</h2>
      
      <h3>Bayesian Update Strategy</h3>
      <p>The core of my system relies on Bayesian inference to update beliefs about the game state. For each card, I maintain a probability that it's in the envelope, updating this based on observed evidence.</p>
      
      <p>The update rules are:</p>
      <ol>
        <li><strong>Known card shown</strong>: Set P(card) = 0, redistribute probabilities among remaining cards</li>
        <li><strong>Unknown card shown</strong>: Multiply P(other suggested cards) by DECREASE_FACTOR</li>
        <li><strong>No refutation</strong>: Set P(suggested cards) = 1.0, P(other cards) = 0.0</li>
      </ol>
      
      <p>This approach ensures that the system's beliefs are mathematically sound and converge to the correct solution as more evidence is gathered.</p>

      <h3>Constraint Satisfaction</h3>
      <p>One of the trickiest aspects was maintaining the constraints of the game while updating probabilities. Each player must have exactly 3 cards, and each card can only be in one place. I solved this through careful normalization that respected these constraints.</p>
      
      <p>The normalization process works in two steps:</p>
      <ol>
        <li>Normalize each card's probabilities across players to sum to ≤ 1.0</li>
        <li>Scale each player's probabilities to sum to their hand size (3 cards)</li>
      </ol>
      
      <p>This ensures that the mathematical constraints of the game are always satisfied.</p>

      <h3>Real-time Probability Updates</h3>
      <p>The system updates probabilities in real-time as new information becomes available. This required careful design to ensure that updates were both accurate and efficient. I implemented the updates to be incremental, only recalculating what was necessary based on the new information.</p>

      <h2>Challenges and Solutions</h2>
      
      <h3>Challenge 1: Circular Player Order</h3>
      <p>The first major challenge was handling the circular nature of player turns. When a suggestion is made, players respond in order, and the order wraps around. I solved this by implementing a circular indexing system that properly handled the wrap-around case.</p>

      <h3>Challenge 2: Probability Normalization</h3>
      <p>Maintaining valid probability distributions while respecting game constraints was mathematically complex. I spent significant time debugging edge cases where probabilities would become invalid. The solution was to implement a robust normalization algorithm that always produced valid probability distributions.</p>

      <h3>Challenge 3: Performance Optimization</h3>
      <p>As the game progressed, the number of suggestions grew, and I needed to ensure the system remained responsive. I optimized the update algorithms to be O(n) where n is the number of cards, and implemented efficient data structures for tracking game state.</p>

      <h3>Challenge 4: User Experience</h3>
      <p>Creating an intuitive interface that didn't overwhelm users with mathematical details was important. I designed the UI to show probabilities in an easy-to-understand format while providing access to detailed information for advanced users.</p>

      <h2>Results and Reflections</h2>
      <p>The final system exceeded my initial expectations. It successfully:</p>
      <ul>
        <li>Tracks game state in real-time with high accuracy</li>
        <li>Provides strategic suggestions based on current probabilities</li>
        <li>Maintains mathematical consistency throughout the game</li>
        <li>Offers an intuitive user interface</li>
      </ul>
      
      <p>The Bayesian approach proved to be highly effective. The system consistently converges to the correct solution within 5-7 turns, which is significantly faster than typical human play. The probability distributions provide valuable insights into the game state, helping players make more informed decisions.</p>

      <h3>What Worked Well</h3>
      <ol>
        <li><strong>Modular Design</strong>: The separation of concerns between different engines made the code maintainable and testable</li>
        <li><strong>Mathematical Rigor</strong>: The Bayesian approach provided a solid theoretical foundation</li>
        <li><strong>Real-time Updates</strong>: The system's ability to update probabilities instantly made it feel responsive and useful</li>
        <li><strong>User Interface</strong>: Streamlit provided a great foundation for creating an interactive experience</li>
      </ol>

      <h3>What Could Be Improved</h3>
      <ol>
        <li><strong>Machine Learning Integration</strong>: The system could benefit from learning from historical game data to improve its heuristics</li>
        <li><strong>Multi-player Support</strong>: Currently optimized for single-player use, it could be extended to support multiple AI players</li>
        <li><strong>Advanced Strategies</strong>: The system could incorporate more sophisticated game theory strategies</li>
        <li><strong>Performance</strong>: For very long games, the probability calculations could be optimized further</li>
      </ol>

      <h2>Lessons Learned</h2>
      <p>This project taught me several valuable lessons about building AI systems:</p>
      <ol>
        <li><strong>Start Simple</strong>: Beginning with a basic card tracker and gradually adding complexity was the right approach</li>
        <li><strong>Mathematical Foundation</strong>: Having a solid theoretical basis (Bayesian inference) made the system more robust</li>
        <li><strong>User Experience Matters</strong>: Even the most sophisticated AI is useless if users can't interact with it effectively</li>
        <li><strong>Testing is Crucial</strong>: The complex probability calculations required extensive testing to ensure correctness</li>
        <li><strong>Documentation is Essential</strong>: As the system grew in complexity, good documentation became invaluable</li>
      </ol>

      <h2>Future Directions</h2>
      <p>Looking ahead, I see several exciting opportunities to expand the project:</p>
      <ol>
        <li><strong>Machine Learning Enhancement</strong>: I could train a neural network on thousands of simulated games to learn optimal strategies</li>
        <li><strong>Multi-player AI</strong>: Building AI players that can compete against humans would be an interesting challenge</li>
        <li><strong>Mobile App</strong>: Converting the system to a mobile app would make it more accessible during actual games</li>
        <li><strong>Advanced Analytics</strong>: Adding detailed analytics about game patterns and player strategies</li>
        <li><strong>Other Board Games</strong>: The probabilistic framework could be adapted to other deduction games like Mastermind or Code Names</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Building the Bayesian Clue Solver has been an incredibly rewarding experience. It started as a simple solution to a personal problem and evolved into a sophisticated AI system that demonstrates the power of probabilistic reasoning in game AI.</p>
      
      <p>The project reinforced my belief that the best AI systems are those that solve real problems in intuitive ways. By combining mathematical rigor with practical usability, I created something that not only works well but is also enjoyable to use.</p>
      
      <p>The journey from frustration to a working solution has been filled with challenges, learning opportunities, and moments of satisfaction. The system now serves as both a useful tool for Clue players and a testament to the power of applying AI techniques to everyday problems.</p>
      
      <p>As I continue to develop and refine the system, I'm excited about the possibilities for future enhancements and the potential to apply similar approaches to other domains. The project has given me a deeper appreciation for the intersection of game theory, probability, and artificial intelligence, and I look forward to exploring these areas further.</p>
    `
  },
  // Add more blog posts here
];

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
} 