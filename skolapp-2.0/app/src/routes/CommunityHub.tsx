import React, { useState } from 'react';
import { useSharedQuizzes, SharedQuiz } from '../hooks/useSharedQuizzes';
import { useRole } from '../auth/role-context';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          onClick={() => !readOnly && onRate?.(star)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= (hoverRating || rating) ? '#ffd700' : '#ddd',
          }}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

interface QuizCardProps {
  quiz: SharedQuiz;
  onRate: (rating: number) => void;
  onComment: (text: string) => void;
  onReport: () => void;
  canInteract: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onRate, onComment, onReport, canInteract }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleReport = () => {
    onReport();
    setShowReportDialog(false);
  };

  return (
    <Card
      density="spacious"
      title={quiz.title}
      meta={`Av ${quiz.authorName} • ${quiz.questionCount} frågor • ${new Date(quiz.publishedAt).toLocaleDateString()}`}
      badge={quiz.isReported ? 'Rapporterad' : undefined}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Tags */}
        {quiz.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {quiz.tags.map(tag => (
              <span
                key={tag}
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StarRating
            rating={quiz.averageRating}
            onRate={canInteract ? onRate : undefined}
            readOnly={!canInteract}
          />
          <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
            {quiz.totalRatings > 0 ? (
              `${quiz.averageRating.toFixed(1)} (${quiz.totalRatings} röster)`
            ) : (
              'Ingen betygsättning än'
            )}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setShowComments(!showComments)}
          >
            Kommentarer ({quiz.comments.length})
          </Button>
          {canInteract && !quiz.isReported && (
            <Button
              variant="danger"
              size="small"
              onClick={() => setShowReportDialog(true)}
            >
              Rapportera
            </Button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
            {/* Add comment form */}
            {canInteract && (
              <form onSubmit={handleCommentSubmit} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Lägg till en kommentar..."
                    style={{ flex: 1 }}
                    maxLength={500}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    disabled={!commentText.trim()}
                  >
                    Skicka
                  </Button>
                </div>
              </form>
            )}

            {/* Comments list */}
            {quiz.comments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quiz.comments.map(comment => (
                  <div
                    key={comment.id}
                    style={{
                      background: 'var(--background-secondary)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                      {comment.authorName}
                    </div>
                    <div style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      {comment.text}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                Inga kommentarer än.
              </p>
            )}
          </div>
        )}

        {/* Report Dialog */}
        {showReportDialog && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => setShowReportDialog(false)}
          >
            <div
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '90%',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Rapportera innehåll</h3>
              <p>Är du säker på att du vill rapportera detta quiz för moderering?</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <Button
                  variant="secondary"
                  onClick={() => setShowReportDialog(false)}
                >
                  Avbryt
                </Button>
                <Button variant="danger" onClick={handleReport}>
                  Rapportera
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const CommunityHub: React.FC = () => {
  const { role } = useRole();
  const {
    sharedQuizzes,
    loading,
    error,
    addComment,
    addRating,
    reportQuiz,
    searchQuizzes,
    filterByTags,
  } = useSharedQuizzes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState(sharedQuizzes);

  const canInteract = role === 'teacher';

  // Get all unique tags
  const allTags = Array.from(
    new Set(sharedQuizzes.flatMap(quiz => quiz.tags))
  ).sort();

  // Update filtered quizzes when search or filters change
  React.useEffect(() => {
    let result = sharedQuizzes;
    
    if (searchQuery.trim()) {
      result = searchQuizzes(searchQuery);
    }
    
    if (selectedTags.length > 0) {
      result = result.filter(quiz =>
        selectedTags.some(tag => quiz.tags.includes(tag))
      );
    }

    // Filter out reported quizzes for non-moderators
    result = result.filter(quiz => !quiz.isReported);
    
    setFilteredQuizzes(result);
  }, [searchQuery, selectedTags, sharedQuizzes, searchQuizzes]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleRate = (quizId: string) => (rating: number) => {
    // Use a simple user ID based on role + timestamp for demo purposes
    const userId = `${role}-${Date.now()}`;
    addRating(quizId, userId, rating);
  };

  const handleComment = (quizId: string) => (text: string) => {
    // Use role as author name for demo purposes
    const authorName = role === 'teacher' ? 'Lärare' : 'Användare';
    addComment(quizId, authorName, text);
  };

  if (!canInteract) {
    return (
      <section>
        <h2>Community Hub</h2>
        <p>Endast lärare har tillgång till community-funktioner.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Community Hub</h2>
      <p>Upptäck och dela quiz med andra lärare.</p>

      {/* Search and Filter */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Sök quiz
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök på titel, författare eller taggar..."
              style={{ width: '100%' }}
            />
          </label>
        </div>

        {allTags.length > 0 && (
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Filtrera på taggar:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  style={{
                    background: selectedTags.includes(tag) ? 'var(--accent)' : 'var(--background-secondary)',
                    color: selectedTags.includes(tag) ? 'white' : 'inherit',
                    border: '1px solid var(--border)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quiz List */}
      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: 'red' }}>Fel: {error}</p>}

      {filteredQuizzes.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>
          {sharedQuizzes.length === 0
            ? 'Inga delade quiz än. Var den första att dela ett quiz!'
            : 'Inga quiz matchar dina filter.'}
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredQuizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onRate={handleRate(quiz.id)}
              onComment={handleComment(quiz.id)}
              onReport={() => reportQuiz(quiz.id)}
              canInteract={canInteract}
            />
          ))}
        </div>
      )}
    </section>
  );
};