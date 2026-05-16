import ReactMarkdown from 'react-markdown';
import content from '../../assets/js/let-vs-const-1.md?raw';

const HomePage = () => {
  return (
    <div className="container">
      <section />
      <ReactMarkdown>{content}</ReactMarkdown>
      <section />
    </div>
  );
};

export default HomePage;
